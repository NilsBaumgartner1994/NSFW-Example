import {DefaultControllerHelper, MyAccessControl} from "nsfw-api";

export default class FileHooks {

   static beforeCreateHook(resource){
       console.log("My Custom Before Hook");
       //console.log(resource);
   }

   static async afterDeleteHook(resource){
       console.log("My Custom After Hook");
       //console.log(resource);
   }

   static register(){
       console.log("ITEMS register all Hooks");
       let accessControlResource = MyAccessControl.getAccessControlResourceOfTablename("Items");

       DefaultControllerHelper.addHook(accessControlResource, DefaultControllerHelper.CRUD_CREATE, Items.beforeCreateHook.bind(null), true);
       DefaultControllerHelper.addHook(accessControlResource, DefaultControllerHelper.CRUD_DELETE, Items.afterDeleteHook.bind(null), false);
   }

}
