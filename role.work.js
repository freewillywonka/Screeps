/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.work');
 * mod.thing == 'a thing'; // true
 */

var roleHarvesterWork = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => { 
                    return ( (structure.structureType == STRUCTURE_CONTAINER) 
                            && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity) );
            }
        });

        var sources = creep.room.find(FIND_SOURCES, {
                filter: (structure) => {
                    return (structure.energy > 0);
                }
        });
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && targets.length > 0) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};

module.exports = roleHarvesterWork;