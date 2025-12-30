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
    styleColor: {
      type: DataTypes.ENUM(
        'primary',
        'secondary',
        'accent',
        'neutral',
        'info',
        'success',
        'warning',
        'error'
      ),
      allowNull: true,
      defaultValue: 'neutral',
    },
    styleShape: {
      type: DataTypes.ENUM('rectangle', 'rounded', 'pill', 'diamond'),
      allowNull: true,
      defaultValue: 'rounded',
    },
    styleType: {
      type: DataTypes.ENUM('solid', 'outline', 'ghost', 'filled'),
      allowNull: true,
      defaultValue: 'solid',
    },
    textRotation: {
      type: DataTypes.ENUM('follow', 'horizontal'),
      allowNull: true,
      defaultValue: 'horizontal',
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
