const errorMiddleware=(error, req, res, next)=>{
    console.log(error)

    res.status(500).json({
        error: "Erreur serveur"
    });
};

export default errorMiddleware;

