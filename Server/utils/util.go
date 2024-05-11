package utils

const (
	//  dbUser= "root"
	//  dbPassword=root@127.0.0.1:3306
	//  dbName=
	// dbAddr=
	// dbNet=
	LoginQuery               = "SELECT uid FROM user_table WHERE username=? and password=?"
	RegisterQuery            = "INSERT INTO user_table (username,password,uid) VALUES (?,?,?)"
	CheckUserNameExistsQuery = "SELECT * FROM user_table WHERE username=?"
	RetrieveUserData         = "SELECT username,uid FROM user_table WHERE username=?"
	GenericError             = "Oops something went wrong."
	AbsentUsernameError      = "Username already exists."
	SuccessRegistrationMsg   = "Registration done.Click on already a user to get to app."
	IncorrectCredentialsMsg  = "Incorrect credentials."
	TokenErrorMsg            = "Could not login"
	SuccessLoginMsg          = "Logged in successfully"
	UnauthorizedMsg          = "Unauthorized"
	SuccesfulLogoutMsg       = "Logged out successfully"
	ValidPasswordMsg         = "Password is valid"
	InvalidPasswordMsg       = "Password is invalid"
	UserDetailsNotFoundMsg   = "User details not found"
)
