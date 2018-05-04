
export default class IndexController {

    index(req, res) {
        res.send('Salut 8 ' + req.params.name);
    }

}