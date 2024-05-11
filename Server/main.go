package main

import (
	"EasyMeet/server/db"
	"EasyMeet/server/utils"
	Constants "EasyMeet/server/utils"
	"database/sql"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	//"time"
)

const SecretKey = "secret"

func processLoginRequest(username string, password string, db *sql.DB) (string, error) {
	entries, err := db.Query(Constants.LoginQuery, username, password)
	if err != nil {
		return "", err
	}
	defer entries.Close()

	var uid string = ""

	for entries.Next() {
		if e := entries.Scan(&uid); e != nil {
			log.Printf("Failed to extract uid %s", e)
			return "", nil
		}
	}
	//Check if entry exist -successful login or not
	return uid, nil
}

func processRegisterRequest(username string, password string, uid string, db *sql.DB) error {
	_, err := db.Exec(Constants.RegisterQuery, username, password, uid)
	if err != nil {
		return err
	}
	//Return if entry registered -successful registered or not
	return nil
}

func checkUsernameExists(username string, db *sql.DB) (bool, error) {
	entries, err := db.Query(Constants.CheckUserNameExistsQuery, username)
	if err != nil {
		return false, err
	}
	defer entries.Close()
	//Check if entry exist or not
	return entries.Next(), nil
}
func getUsersLogin(database *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request LoginRequest
		//Bind request
		if err := c.BindJSON(&request); err != nil {
			return
		}

		//Process login request
		uid, e := processLoginRequest(request.Username, request.Password, database)
		if e != nil {
			log.Printf("Failed to login request %s", e)
			c.JSON(http.StatusBadGateway, Constants.GenericError)
			return
		}
		if len(uid) > 0 {
			customClaims := jwt.MapClaims{
				"username":  request.Username,
				"uid":       uid,
				"ExpiresAt": time.Now().Add(time.Hour * 5).Unix(),
			}
			claims := jwt.NewWithClaims(jwt.SigningMethodHS256, customClaims)

			token, err := claims.SignedString([]byte(SecretKey))
			if err != nil {
				c.JSON(http.StatusInternalServerError, Constants.TokenErrorMsg)
				return
			}

			cookie := http.Cookie{
				Name:     "jwt",
				Value:    token,
				Expires:  time.Now().Add(time.Hour * 5),
				HttpOnly: true,
			}

			c.SetCookie(cookie.Name, cookie.Value, int(cookie.Expires.Unix()), "", "", true, cookie.HttpOnly)
			c.JSON(http.StatusOK, Constants.SuccessLoginMsg)
		} else {
			c.JSON(http.StatusBadRequest, Constants.IncorrectCredentialsMsg)
		}
	}
}
func getUsersData(database *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request UsersDataRequest
		//Bind request
		if err := c.BindJSON(&request); err != nil {
			return
		}
		entries, e := database.Query(Constants.RetrieveUserData, request.DisplayName)
		if e != nil {
			log.Println("Failed to find the display name in db")
			c.JSON(http.StatusBadGateway, utils.GenericError)
			return
		}
		defer entries.Close()

		user := new(UserData)

		for entries.Next() {
			if e := entries.Scan(&user.Username, &user.Uid); e != nil {
				log.Printf("Failed to extract uid %s", e)
				c.JSON(http.StatusBadGateway, utils.GenericError)
				return
			}
		}
		//Check if entry exist -successful data retrieve
		if user.Username == "" && user.Uid == "" {
			c.JSON(http.StatusNotFound, utils.UserDetailsNotFoundMsg)
			return
		}
		c.JSON(http.StatusOK, user)
	}
}
func getUsersRegister(database *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request Request
		if err := c.BindJSON(&request); err != nil {
			log.Printf("Couldn't bind the request.")
			return
		}
		exists, e := checkUsernameExists(request.Username, database)
		if e != nil {
			log.Printf("Failed to check username %s", e)
			c.JSON(http.StatusBadGateway, Constants.GenericError)
			return
		}
		if !exists {
			err := processRegisterRequest(request.Username, request.Password, request.Uid, database)
			if err != nil {
				log.Printf("Failed to register request %s", err)
				c.JSON(http.StatusBadGateway, Constants.GenericError)
				return
			}
			c.JSON(http.StatusOK, Constants.SuccessRegistrationMsg) //Need to check
		} else {
			c.JSON(http.StatusBadRequest, Constants.AbsentUsernameError)
		}
	}
}

// Get users information (expiry time and issuer) from cookie
func getUsersInfo() gin.HandlerFunc {
	return func(c *gin.Context) {
		type customClaims struct {
			Username  string `json:"username"`
			Uid       string `json:"uid"`
			ExpiresAt int64  `json:"ExpiresAt"`
			jwt.StandardClaims
		}
		cookie, _ := c.Cookie("jwt")
		token, e := jwt.ParseWithClaims(cookie, &customClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(SecretKey), nil
		})
		if e != nil {
			error_msg := Constants.UnauthorizedMsg
			c.JSON(http.StatusUnauthorized, error_msg)
			return
		}

		claims := token.Claims
		c.JSON(http.StatusOK, claims)
	}
}

func getUsersLogOut() gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie := http.Cookie{
			Name:     "jwt",
			Value:    "",
			Expires:  time.Now().Add(-time.Hour), //This cookie expired an hour ago
			HttpOnly: true,
		}
		c.SetCookie(cookie.Name, cookie.Value, int(cookie.Expires.Unix()), "", "", true, cookie.HttpOnly)
		c.JSON(http.StatusOK, Constants.SuccesfulLogoutMsg)
	}
}
func main() {
	router := gin.Default()
	//Connect to users database
	db, err := db.ConnectToDB()
	if err != nil {
		log.Printf("Failed to connect to DB")
	}
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST", "GET"},
		AllowHeaders:     []string{"Content-Type", "Content-Length", "Accept-Encoding"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           86400,
	}))
	//API Routes
	router.POST("/login", getUsersLogin(db))
	router.POST("/register", getUsersRegister(db))
	router.POST("/getUsersData", getUsersData(db))
	router.GET("/retrieveUserData", getUsersInfo())
	router.GET("/logout", getUsersLogOut())
	log.Printf("Listening on server 8080:", router.Run("localhost:8080"))
}
