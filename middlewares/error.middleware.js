const errorMiddleware=(error, req, res, next)=>{
    console.log(error)

    res.status(error.status || 500).json({
         error: error.message || "Erreur serveur" 
    });

};

export default errorMiddleware;

