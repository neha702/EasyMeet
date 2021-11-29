import React from 'react';
import videologo from './video-chat.jpg';
import chatlogo from './text-chat.jpg';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import { BsFillChatRightFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { FaSignOutAlt } from 'react-icons/fa';

const Home = () => {
    const signout = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        window.location.href = '/login';
        console.log("Done");
    };
    const items = [
        <h3 style={{ margin: 15 }}>Welcome {localStorage.getItem('username')}!</h3>
        , <SidebarItem leftIcon={<AiFillHome />} href="/home">Home</SidebarItem>,
        <SidebarItem leftIcon={<BsFillChatRightFill />} href="/home/chat_main">Chat</SidebarItem>,
        <SidebarItem leftIcon={<BsFillCameraVideoFill />} href="/home/video_chat">Video-Call</SidebarItem>
        , <form onSubmit={signout} align="right">
            <input type="submit" value="Sign out" className="btn btn-block btn-real" />
        </form>
    ];
    return (
        <>
            <Sidebar background="#6A5ACD" content={items}>
                {/* <!-- ***** Preloader Start ***** --> */}
                <div id="preloader">
                    <div className="jumper">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <div className="welcome-area" id="welcome">
                    <div className="header-text">
                        <div className="container">

                            <div className="row">
                                <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                                    <h1 className={{ color: "black" }}><strong>EasyMeet</strong></h1>
                                    <p className={{ color: "black" }}>An ideal discussion forum for students and teachers to facilitate with video calling and chat features in this current pandemic period.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 
    <!-- ***** Features Big Item Start ***** --> */}
                <section className="section padding-top-70 padding-bottom-0" id="features">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-12 col-sm-12 align-self-center" data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                                <img src={chatlogo} className="rounded img-fluid d-block mx-auto" alt="App" />
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-top-fix">
                                <div className="left-heading">
                                    <h2 className="section-title">Chat</h2>
                                </div>
                                <div className="left-text">
                                    <p><strong>One of the features of EasyMeet is Chat,which basically helps in interaction of students and teachers.This is basically a forum where students opting a particular subject and respective class teacher can have discussion.</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="hr"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- ***** Features Big Item Start ***** --> */}
                <section className="section padding-bottom-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-bottom-fix">
                                <div className="left-heading">
                                    <h2 className="section-title">Video-Call</h2>
                                </div>
                                <div className="left-text">
                                    <p><strong>Sometimes simple texting can be difficult for both teachers and students to discuss doubts. Easymeet provides a video-call feature where a teacher and a student can have one to one discussion.</strong></p>
                                </div>
                            </div>
                            <div className="col-lg-1"></div>
                            <div className="col-lg-5 col-md-12 col-sm-12 align-self-center mobile-bottom-fix-big" data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                                <img src={videologo} className="rounded img-fluid d-block mx-auto" alt="App" />
                            </div>
                        </div>
                    </div>
                </section>
            </Sidebar>
        </>
    )
}
export default Home;
