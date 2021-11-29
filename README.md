# EasyMeet

## Microsoft Engage Mentorship Program 2021 submission


### Features : 

**1) Chat-app :** One of the features of EasyMeet is Chat,which basically helps in interaction of students and teachers.This is basically a forum where students opting a particular subject and respective class teacher can have discussion.

**2)Video-Call:** Sometimes simple texting can be difficult for both teachers and students to discuss doubts. Easymeet provides a video-call feature where a teacher and a student can have one to one discussion.

### Tech-stacks


**Front-end :**     ![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

**Back-end :**        ![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

**DB :**     ![image](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)


![image](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)      ![image](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

### Glimpses of Interface:

1) Sign up and login page

![image](https://user-images.githubusercontent.com/51429924/143766447-225699ef-6649-43a3-a1d6-66c36890619b.png)


![image](https://user-images.githubusercontent.com/51429924/143766452-61dda923-ee72-476e-9f73-431dfcdbec42.png)

2) Home page

![image](https://user-images.githubusercontent.com/51429924/143766490-830a0ef9-d5e0-454e-90ed-cdecf54dc544.png)

3) Chat page

![image](https://user-images.githubusercontent.com/51429924/143766545-2e7f314b-e76d-4fa1-84df-b34e3635f981.png)

4) Video-Call page

![Screenshot (457)](https://user-images.githubusercontent.com/51429924/143766590-bb41e0cd-5b7e-4654-bb77-ca34d164d629.png)

### How to get to the app?

1) First page that we get after npm run start is the registartion page,if we give username and password we get a pop that asks us to move to login page.

2) If we enter username and password that already exist in database for registration page,we get popup for error message.

3) If a user already exists or we move to login page,we need to provide correct credentials to get to the home page,otherwise an error popup will show.

4) If correct credentials provided, we are redirected to home page,where we have sidebar with three links for -Home,Chat and Video-Call. Make sure to give permissions to mic and camera for video call.Refresh the page and copy id and provide to the person we want to interact. That person has to paste the id in make a call and click on call.

5) For the chat page, an admin can add people to the group who are in database.

6) Signout button will simply clear localstorage and redirect to login page.

### Instructions:

1) Clone the repo by git clone https://github.com/neha702/EasyMeet.git.

2) Type cd <name to which repo is cloned> in terminal.

3) Type cd Client.

4) Run npm install to install all the dependencies.

5) Type cd ..

6) Then type cd Server.

7) Run npm install to install the dependencies.

8) Type cd .. in terminal.

9) Azure Cloud MySQL DB is used here ,credentials present in Server ->expressweb.js file.

10) Run there npm  start.

11) Then open another terminal ,type cd Server.

12)  Do the nodemon expressweb.js

14)After that one can see a page opening at http://localhost:3000/.

15) Route http://localhost:3000/register to get to registration page.



### NOTE:

1) Chatengine.io allows only 25 users without upgradation.

2) When opening video-Call page make sure to turn on camera and mic.

3) Credentials for chatengine.io:
   
   Email : neha.ds.702@gmail.com
   
   Password : EasyMeet123
   
   All details regarding private key and project ID present there.
   
 4) Cloud DB used here,credentials present in expressweb.js file.If you want to connect to your own cloud db,make sure to change user,host,password,database and table name in expressweb.js.
 
 5) The web-app is responsive in nature but try to view in PC for best experience.
