const {add,sub}=require('./math.js');





const number=[1,2,3,4,5,6,7,8,9,10]
let total=0;
 number.map((num) => {
  
    total += num;
    return total;
});

console.log(total);
const products = ['pen', 'notebook', 'eraser'];

const newproduct=products.map((products)=>{
    return products.toUpperCase()

})
console.log(newproduct);
const nwproduct=products.map((products)=>{
    return products.toLowerCase()

})
console.log(nwproduct);

const product = [
    { name: 'Pen', price: 10 },
    { name: 'Notebook', price: 50 },
    { name: 'Eraser', price: 5 }
];

const filter=product.filter((product)=>{
 return product.price>5
})
console.log(filter);



const numbers = [10, 20, 35, 15];

const numm=numbers.reduce((acc,curr,index,arr)=>{
    console.log(acc,curr,index);
    
    return acc+curr
},0)
console.log(numm);


const items = [
    { name: 'Pen', category: 'Stationery' },
    { name: 'Shampoo', category: 'Toiletries' },
    { name: 'Notebook', category: 'Stationery' },
    { name: 'Soap', category: 'Toiletries' }
];

const grouped = items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item.name);
    return acc;
}, {});

console.log(grouped);

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('Data fetched not successfully!'), 5000);
    });
};

fetchData().then((data) => console.log(data)).catch((error) => console.error(error));
console.log(add(5, 3));       
console.log(sub(10, 4))