const constants = require('../../helper/constants');

class Base_State {
    state_id = null;
    state_name = null;
    valid_next_states = [];
    /**
     * 
     * @param {*} nextStateID The new state of the product. 
     * @param {*} callback returns with a flag of validation.
     */
    isValidNextState(nextStateID,callback) {
        let validFlag = this.valid_next_states.includes(Number(nextStateID));
        callback(null,validFlag);
    }
}

class Draft_State extends Base_State {
    constructor(valid_next_states=[constants.DeletedDraftStateID,constants.AvailableStateID]) {
        super();
		this.valid_next_states = valid_next_states;
	} 
}

class Deleted_Draft_State extends Base_State {
    constructor(valid_next_states=[]) {
		super();
		this.valid_next_states = valid_next_states;
	} 
}
class Available_State extends Base_State {
    constructor(valid_next_states=[constants.ExpiredStateID,constants.DeletedStateID,constants.ReservedStateID]) {
		super();
		this.valid_next_states = valid_next_states;
	} 
}
class Expired_State extends Base_State {
    constructor(valid_next_states=[constants.AvailableStateID]) {
		super();
		this.valid_next_states = valid_next_states;
	} 
}
class Deleted_State extends Base_State {
    constructor(valid_next_states=[]) {
		super();
		this.valid_next_states = valid_next_states;
	} 
}
class Sold_State extends Base_State {
    constructor(valid_next_states=[constants.ReturnedStateID]) {
		super();
		this.valid_next_states = valid_next_states;
	} 
}
class Reserved_State extends Base_State {
    constructor(valid_next_states=[constants.SoldStateID,constants.AvailableStateID]) {
		super();
		this.valid_next_states = valid_next_states;
	} 
}
class Returned_State extends Base_State {
    constructor(valid_next_states=[constants.DraftStateID,constants.DeletedStateID]) {
		super();
		this.valid_next_states = valid_next_states;
	} 
}

module.exports = {
    Base_State : Base_State, 
    Draft_State: Draft_State,
    Deleted_Draft_State: Deleted_Draft_State,
    Available_State: Available_State,
    Expired_State: Expired_State,
    Deleted_State: Deleted_State,
    Sold_State: Sold_State,
    Reserved_State: Reserved_State,
    Returned_State: Returned_State,
}