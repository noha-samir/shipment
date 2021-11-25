const constants = require('../../helper/constants');
let States = require('./BaseState');
/**
 * Design pattern : Factory Design Pattern.
 * Design pattern to select the target and build the required object.
 */
class State_Factory {
    createState(nextStateId,callback) {
        let returnedBaseState = null;
        if(nextStateId == constants.DraftStateID){
            returnedBaseState = new States.Draft_State();
        }
        else if(nextStateId == constants.DeletedDraftStateID){
            returnedBaseState = new States.Deleted_Draft_State();
        }
        else if(nextStateId == constants.AvailableStateID){
            returnedBaseState = new States.Available_State();
        }
        else if(nextStateId == constants.ExpiredStateID){
            returnedBaseState = new States.Expired_State();
        }
        else if(nextStateId == constants.DeletedStateID){
            returnedBaseState = new States.Deleted_State();
        }
        else if(nextStateId == constants.SoldStateID){
            returnedBaseState = new States.Sold_State();
        }
        else if(nextStateId == constants.ReservedStateID){
            returnedBaseState = new States.Reserved_State();
        }
        else if(nextStateId == constants.ReturnedStateID){
            returnedBaseState = new States.Returned_State();
        }
        callback(null,returnedBaseState);
    }
}

module.exports = State_Factory;