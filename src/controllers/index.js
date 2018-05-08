
export default class IndexController {

    async index(req, res) {
        res.json({
            resource: 'homepage'
        });
    }

}
