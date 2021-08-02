writeCode

Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

Write aggregation queries to perform following tasks.

1. Find all users who are active.

```js
db.users.aggregate([{$match: {isActive:true}}]).pretty()

```

2. Find all users whose name includes `blake` case insensitive.
```js
 
 db.users.aggregate([{$match : {name:{$regex:'blake', $options: 'i'} }}]).pretty();

```

3. Find all males.
```js
db.users.aggregate([{$match: {gender: "male"}}]).pretty()
```

4. Find all active males.

```js
db.users.aggregate([{$match: {gender: "male", isActive:true}}]).pretty()

```

5. Find all active females whose age is >= 25.

```js
db.users.aggregate([{ $match: { $and: [ { age: { $gte: 25} }, { gender: "female" }, {isActive:true} ] } }]).pretty()

```

6. Find all 40+ males with green eyecolor.
```js
db.users.aggregate([{ $match: { $and: [ { age: { $gte: 40} }, { gender: "male" }, {eyeColor:"green"} ] } }]).pretty()

```

7. Find all blue eyed men working in 'USA'.

```js
db.users.aggregate([{ $match: { $and: [{"company.location.country":"USA" }, { gender: "male" }, {eyeColor:"blue"} ] } }]).pretty()


```

8. Find all female working in Germany with green eyes and apple as favoriteFruit.

```js
db.users.aggregate([{ $match: { $and: [{"company.location.country":"Germany" }, { gender: "female" }, {eyeColor:"green"},{favoriteFruit:"apple"} ] } }]).pretty()

```

9. Count total male and females.
```js

db.users.aggregate([{$group:{_id:"$gender", count:{$sum:1}} }])

```

10. Count all whose eyeColor is green.

```js
db.users.aggregate([{$match: {eyeColor:"green"} }, {$group: {_id: null, count:{$sum:1}}}])


```

11. Count all 20+ females who have brown eyes.
```js
db.users.aggregate([
  { $match: { eyeColor: 'brown', gender: 'female', age: { $gte: 20 } } },
  { $group: { _id: '$eyeColor', count: { $sum: 1 } } },
]);
```

12. Count all occurences of all eyeColors.
    Something like:-

```
blue -> 30
brown -> 67
green -> 123
```
```js
db.users.aggregate([{$group:{_id:'$eyeColor', count:{$sum:1}}}])

```

13. Count all females whose tags array include `amet` in it.
```js
db.users.aggregate([{$match: {tags:{$in:["elit"]}} },{$group:{_id:null, count:{$sum:1}}}])


```


14. Find the average age of entire collection

```js
db.users.aggregate([{$group:{_id:null, avrageage:{$avg:'$age'}}}])

```


15. Find the average age of males and females i.e. group them by gender.

```js
db.users.aggregate([{$group:{_id:"$gender", avrageage:{$avg:'$age'}} }])
```


16. Find the user with maximum age.

```js
db.users.aggregate([{$group:{_id:null , maxage:{$max:'$age'}} }])
db.users.aggregate([{$sort:{age:-1}},{ $limit:1}]).pretty()

```

17. Find the document with minimum age.
```js

db.users.aggregate([{$group:{_id:null , maxage:{$min:'$age'}} }])

db.users.aggregate([{$sort:{age:1}},{ $limit:1}]).pretty()


```

18. Find the sum of ages of all males and females.
```js

db.users.aggregate([{$group:{_id:null , sumofage:{$sum:'$age'}} }])

```
19. Group all males by their eyeColor.

```js

 db.users.aggregate([{$group: {_id:'$eyeColor', records:{$push:'$$ROOT'}}}]).pretty()

```

20. group all 30+ females by their age.



21. Group all 23+ males with blue eyes working in Germany.




22. Group all by tag names i.e. use \$unwind since tags are array.



23. Group all males whose favoriteFruit is `banana` who have registered before 2015.



24. Group all females by their favoriteFruit.


25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);
```js
db.users.distinct('eyeColor');
```


26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.

```js
db.users.aggregate([{ $match: { $and: [{"company.location.country":"USA" }, { gender: "female" }, {eyeColor:"blue"},{favoriteFruit:"apple"} ] } },{$sort:{age:-1}}]).pretty()

```

27. Find all 18+ inactive men and return only the fields specified below in the below provided format

```js

db.users
  .aggregate([
    { $match: { isActive: false, gender: 'male', age: { $gte: 18 } } },
    {
      $project: {
        name: 1,
        email: 1,
        identity: {
          eye: $eyeColor,
          phone: '$company.phone',
          location: '$company.location',
        },
      },
    },
  ]).pretty();


{
  name: "",
  email: '';
  identity: {
    eye: '',
    phone: '',
    location: ''
  }
}
```
