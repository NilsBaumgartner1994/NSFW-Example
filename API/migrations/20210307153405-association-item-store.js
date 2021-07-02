'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Items',
        "StoreId",
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Stores', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Items', // name of Source model
        'StoreId' // key we want to remove
    );
  }
};
