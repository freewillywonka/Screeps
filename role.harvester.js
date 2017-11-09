/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.storing && creep.carry.energy == 0) {
            creep.memory.storing = false;
            creep.say('🔄 harvest');
	    }
	    else if(!creep.memory.storing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.storing = true;
	        creep.say('🚧 store');
	    }
        
	    if(creep.memory.storing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
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
            var sources = creep.room.find(FIND_SOURCES);
            if( creep.withdraw(cSources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(cSources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else{
                creep.moveTo(Game.flags['Done_Flag1']);
            }
        }
	}
};

module.exports = roleHarvester;
