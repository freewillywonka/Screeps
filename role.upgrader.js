/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if( creep.memory.upgrading && (creep.carry.energy == 0) ) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if( !creep.memory.upgrading && (creep.carry.energy == creep.carryCapacity) ) {
	        creep.memory.upgrading = true;
	        creep.say('🚧 upgrade');
	    }
	    
	    
	    if(creep.memory.upgrading) {
	        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffff00'}});
            }
        }
        else {
            var cSources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => { 
                    return (structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store[RESOURCE_ENERGY] > 0);
                }
            });
            var sources = creep.room.find(FIND_SOURCES);
            if( creep.withdraw(cSources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(cSources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleUpgrader;
