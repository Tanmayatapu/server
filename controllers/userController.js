//get /api/user

export const getUserData = async (req, res) => {
  try {

    const user = req.user;

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

//Store user recent searched cities
export const storeRecentSearchedCities = async(req,res)=>{
    try {
        const {recentSearchedCity} =req.body;
        const user = await req.user;
        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCity)
        }else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity)
        }
        await user.save();
        res.json({success:true,message:"city added"})
    } catch (error) {
        res.json({success:false,message:error.message })
    }
}