//Document model:
//MongoDB stores the data in a JSON like structure called BSON.
//internally mongodb stores the data in BSON
//If embedded document size limit is 16mb.
//Mongodb allows flexible schema so document can contain different field in same collection.

//Indexing:
//Indexing is a data structure that improves query performance. It uses B-Tree data structure.
//Pros: faster queries, efficient sorting, better performance.
//Cons: extra memory usage, index maintainance overhead, 
//index cardinality means number of unique index
//more indxes slow write operation.
//Do not use index when small collection, fields rarely used in queries, heavy write system.
//Trafe off of indexing is it improves read operation but degrade write operation.

//Aggregation pipeline:
//It works like a data processing pipeline, for filtering, sorting and grouping data.
//$facet : runs multiple pipelines parallel.
//Example:
db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $group: {
      _id: "$userId",
      totalSales: { $sum: "$amount" }
    }
  },
  { $sort: { totalSales: -1 } }
])
//without $: treated as field name
//with $: treated as operator