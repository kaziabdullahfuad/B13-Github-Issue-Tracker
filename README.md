## 1️⃣ What is the difference between var, let, and const?
Ans:
Var is function scoped where as let and const are block-scoped. Only var can be redeclared but not let and const. Const cannot be redeclared or reassigned since it means its something constant although if using a const array we can push another element. Nowdays var isn't used at all since it can introduce a lot of bugs.
## 2️⃣ What is the spread operator (...)?
Ans:
It is denoted by three dots (...) and it is used to expand the elements of an iterable or object properties into elements. There are common use cases such as 
1. Copying arrays- which makes a shallow copy and doesn't modify the original array
const arr=[1,2,3];
const copyArray=[...arr] // shallow copy
2. Merging arrays and objects
const arr=[1,2];
const arr2[3,4];
const mergeArr=[...arr,...arr2]; //[1,2,3,4]
3. Passing arguments to functions 
4. Adding Elements to arrays
## 3️⃣ What is the difference between map(), filter(), and forEach()?
Ans:
All three of them loop over the elements but for different purposes.
- forEach(): It doesn't return anything. It executes a function for each element.
- map(): It returns a new array by applying the function to every element.
- filter(): It creates a newe array based on the elements which pass the specific test.
## 4️⃣ What is an arrow function?
It is a shorter way to write functions. It uses the *=>* arrow symbol. Conventional functions such as:
function add(a,b){
    return a+b;
}
can simply be written in an arrow function like:
const add=(a,b)=>a+b;
## 5️⃣ What are template literals?
It uses backticks and make it much more easy to insert variables directly into text. It is also often used to create innerhtml for a parent container because of its ease of use.
- Old style: "Hello "+name;
- Template Literal: `Hello, ${name}`;