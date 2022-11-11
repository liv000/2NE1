const navStyle = `

header{
    margin: 10px 100px;
    padding: 10px;
    height: auto;
}
#header-logo{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;;
}
#header-navbar{
    background-color: #F7ECDE;
    justify-content: center; 
}
#header-navbar a{
    margin: 0px 10px;
}
a{
    font-weight: bold;
}
#header-navbar{
    
    display: flex;
}
@media screen and (max-width: 1024px) {
    #header-navbar{
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    #header-navbar a{
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    .navbar-dropdown{
        display:none;
    }
    .navbar-dropdown:hover{
        display: "";
    }

} 
.navbar-toogleBtn{
    display:none;
    position: absolute;
    right: 32px;
    font-size: 24px;
    color:#rgb(84, 186, 185);
}

.footerTitle{
    font-size: 20px;
    font-weight:bold;
}
#footer{
    display:flex;
    position: relative;
    padding: 30px 0;
    text-align:center;
    font-size: 14px;
    justify-content: center;
}
#footer-text{
    /* width: 200px;
    height: 100px; */
}
#last{
    size: 5px;
}
`

export default navStyle;