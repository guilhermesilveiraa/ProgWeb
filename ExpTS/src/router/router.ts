import {Router, Request, Response} from "express"
const router = Router()

router.get("/hb1", (req, res) =>{
    res.render("hb1", {layout: false});

});

router.get("/hb2", (req, res) =>{
    res.render("hb2", {layout: false});

});

router.get("/hb3", (req, res) =>{
    res.render("hb3", {layout: false});
});

router.get("/hb4", (req, res) =>{
    const techs = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
        ];
    res.render("hb4", {techs, layout: false});
});



router.get("/", (req, res) => {
    res.send("Olá Mundo");
});

router.get("/about", (req, res) => {
    res.send("Página about");
});

router.get("/loremIpsum", (req, res) =>{
    res.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in dapibus magna, sed euismod mi. Cras sed vestibulum dui, ac volutpat arcu. Suspendisse eleifend metus vitae augue vehicula, non molestie ligula finibus. Mauris sit amet tellus gravida, vestibulum enim vel, blandit neque. Proin vitae leo dapibus, dictum ipsum sit amet, pellentesque risus. Aliquam nec ultricies orci. Nam vitae felis vitae nulla porttitor pharetra. Donec pharetra libero vel est pellentesque mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque quis magna ultricies turpis tristique eleifend in sit amet eros. Cras egestas eros ac laoreet volutpat. Praesent purus sapien, egestas at pellentesque et, aliquam id eros");
});

export default router