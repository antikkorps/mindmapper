import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

/**
 * Map model
 * Represents mindmaps owned by users
 */
const Map = sequelize.define(
  'Map',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Untitled Mindmap',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'maps',
    timestamps: true,
  }
)

export default Map
