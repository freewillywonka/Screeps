
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvesterCarry');
 * mod.thing == 'a thing'; // true
 */

//Carries energy from container to spawn1. No work, all carry and move.
var roleHarvesterCarry = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.carrying && creep.carry.energy == 0) {
            creep.memory.carrying = false;
            creep.say('🔄 harvest');
	    }
	    else if(!creep.memory.carrying && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.carrying = true;
	        creep.say('🚧 transfer');
	    }

	    if(creep.memory.carrying) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_STORAGE) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.moveTo(Game.flags['Done_Flag1']);
            }
        }
        else {
            var cSources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => { 
                    return (structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store[RESOURCE_ENERGY] > 0);
                }
            });
            var sources = creep.room.find(FIND_DROPPED_RESOURCES);
            if( creep.pickup(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            else if( creep.withdraw(cSources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(cSources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
        }
	}
};
module.exports = roleHarvesterCarry;
