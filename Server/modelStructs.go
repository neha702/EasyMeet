package main

type Request struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Uid      string `json:"uid"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UsersDataRequest struct {
	DisplayName string `json:"displayName"`
}

type UserData struct {
	Username string `json:"username"`
	Uid      string `json:"uid"`
}
