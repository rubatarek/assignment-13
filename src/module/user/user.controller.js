import {Router} from "express"
import { getUserData,getUserDataByUName ,updateUserData,deleteUser,deactivateUser,activateUser} from "./user.service.js"
import { SuccessResponse } from "../../common/response/success.response.js"
import { auth } from "../../common/middleware/auth/auth.js"
import { upload } from "../../common/middleware/multer.js"

const router=Router()



router.get('/get-user-data',auth, async (req, res) => {
    let userData= await getUserData(req.user)
    SuccessResponse({
        res,
        message: "User data ", 
        data: userData
    })
})
  
router.put('/update-user-profile',auth,upload().single("coverImage") ,async (req, res) => {
    //upload().array("coverImage") yrf3 aktar men sora
    //console.log(req.file)// file 3shan single
let updatedUserData= await updateUserData(req.user, req.body, req.file)
SuccessResponse({
    res,
    message: "User data updated successfully",
    data: updatedUserData
})
})

router.delete('/delete-user', auth, async (req, res) => {
    let deletedUser = await deleteUser(req.user);
    SuccessResponse({
        res,
        message: "User deleted successfully",
        data: deletedUser
    });
});
router.put('/deactivate-user', auth, async (req, res) => {
    let user = await deactivateUser(req.user);
    SuccessResponse({
        res,
        message: "User deactivated successfully",
        data: user
    });
});

router.put('/activate-user', auth, async (req, res) => {
    let user = await activateUser(req.user);
    SuccessResponse({
        res,
        message: "User activated successfully",
        data: user
    });
});



router.get('/get-user-data -by-UName/:uniqueAccName',auth, async (req, res) => {

    let data=await getUserDataByUName(req.params)
    SuccessResponse({
        res,
        message: "User data ", 
        data: data
    })


})

export default router