import {Router, Request, Response} from "express"

const router = Router()

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