import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

/**
 * Node model
 * Represents nodes within mindmaps with hierarchical structure
 */
const Node = sequelize.define(
  'Node',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'New Node',
    },
    posX: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    posY: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'nodes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    mapId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'maps',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'nodes',
    timestamps: true,
    indexes: [
      {
        name: 'nodes_parentId_idx',
        fields: ['parentId'],
      },
      {
        name: 'nodes_mapId_idx',
        fields: ['mapId'],
      },
    ],
  }
)

export default Node
