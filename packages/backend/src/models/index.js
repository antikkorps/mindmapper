import User from './User.js'
import Map from './Map.js'
import Node from './Node.js'

/**
 * Define model relationships
 */

// User -> Maps (One-to-Many)
User.hasMany(Map, {
  foreignKey: 'userId',
  as: 'maps',
})

Map.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
})

// Map -> Nodes (One-to-Many)
Map.hasMany(Node, {
  foreignKey: 'mapId',
  as: 'nodes',
  onDelete: 'CASCADE',
})

Node.belongsTo(Map, {
  foreignKey: 'mapId',
  as: 'map',
})

// Node self-reference (Parent -> Children)
Node.hasMany(Node, {
  foreignKey: 'parentId',
  as: 'children',
})

Node.belongsTo(Node, {
  foreignKey: 'parentId',
  as: 'parent',
})

export { User, Map, Node }
