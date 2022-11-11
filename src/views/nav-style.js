const navStyle = `

header{
    margin: 10px;
    padding: 10px;
    height: auto;
}
#header-navbar{
    /* background: #54BAB9; */
    background-color: #F7ECDE;
    // color: #F7ECDE;
    height:auto;
    margin: 0px 300px;
    text-align:center;
}
#header-navbar a{
    margin: 0px 10px;
}
#header-text{
    font-weight: bold;
    font-size: 25px;
}
#nav-var{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 1125px;
    
    box-sizing: border-box;
}
#header-logo{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;;
}

#header-logo-text {
    text-decoration : none;
    color: #54BAB9;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 40px;
    font-weight: bold;
    margin: 0 20px;
}
a{
    font-weight: bold;
}
#header-navbar{
    /* position: relative;
    
    box-sizing: border-box;
    margin-bottom: 2px;
    height: 54px;
    line-height: 54px;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    flex-wrap: nowrap; */
    display: flex;
}
//  @media screen and (max-width: 768px) {
//     #header-bar{
//         flex-direction: column;
//         align-items: flex-start;
//     }
//     #nav-bar{
//         flex-direction: column;
//         align-items: center;
//     }
//     #header-navbar{
//         flex-direction: column;
//         align-items: center;
//         width: 100%;
//     }
//     #header-navbar a{
//         flex-direction: column;
//         align-items: center;
//         width: 100%;
//     }

// } 
.navbar-toogleBtn{
    display:none;
    position: absolute;
    right: 32px;
    font-size: 24px;
    color:#rgb(84, 186, 185);
}
@media screen and (max-width: 768px) {
    #header-bar{
        flex-direction: column;
        align-items:center;
    }
    #header-logo{
        align-items:center;
    }
    #header-navbar{
        display: none;
        flex-direction: column;
        align-items: center;
        width:100%;
        text-align: center;
    }
    #header-more-category{
        display: none;
        
    }
    #header-navbar a{
        width:100%;
        text-align: center;
    }
    .navbar-toogleBtn{
        display: block;
    }
    #header-navbar.active{
        display: flex;
    }
}

footer{
    clear: both;
    background: #F7ECDE;
    position: relative;
    padding: 30px 0;
    font-size: 14px;
    box-sizing: border-box;
}
/* @media (max-width: 768px) {
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .sub-container {
        display: block;
    }
} */

#last{
    size: 5px;
}

#footer{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto; 
}
#footer-text{
    /* width: 200px;
    height: 100px; */
}
.hello{
    width:2000px;
    height: 100px;
}

`

export default navStyle;