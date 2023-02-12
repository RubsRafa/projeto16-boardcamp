export function validateSchema(schema) {
    return (req, res, next) => {

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            console.log(error);
            return res.status(400).send(error.details.map(err => err.message));
        }
        next(); 
    };
};