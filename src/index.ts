// https://www.typescriptlang.org/docs/handbook/basic-types.html

// Types
const married: boolean = false;
const age: number = 26;
const myName: string = 'Oliver';


// Array
const friends1: Array<string> = ['One', 'Two', 'Three'];
const friends2: string[] = ['One', 'Two', 'Three'];
const friends3: string[][] = [['One'], ['Two'], ['Three']];
const friends4: any[] = ['Oliver', 26, false];


// Tuple - fixed number of known types
const user: [string, number, boolean] = ['Oliver', 26, false];



// Enum. by default numbering start from 0
// if need to start from 3 -> enum Color {Red = 3}
enum Color { Red, Green, Blue }

const myFavorite: Color = Color.Red; // 0
// Color[1] -> 'Green'

enum Companies {
  QS = 'Quartsoft',
  IT20 = 'it 2.0',
  EPAM = 'epam',
}
// Companies.QS -> Quartsoft


// Any
let anyType: any = 26;
anyType = 'Oliver';


// Void - type doesn't return anything
function withoutReturn(): void {}
const empty: void = undefined; // undefined only


// Never - function with error or endless cycle
function throwed(): never {
  throw new Error('critical error');
}

function infinite(): never {
  while (true) {}
}


// Object - type that assign non primitive values, such as:
// number, string, boolean, bigint, symbol, null, undefined
declare function create(arg?: object): void;

create({ a: 0 });
// Error -> create(12);


// Type assertions
const id: any = '12';
const numberID1 = (<number>id);
const numberID2 = (id as number);


// Custom Types
type userModel = object;
const admin: userModel = { id: 1 };

type ID = string | number;
const myID_1: ID = 12;
const myID_2: ID = '12';

type possibleNumbers = 6 | 12 | 3;
const myFavoriteNumber: possibleNumbers = 6;

type possibleNames = 'Oliver' | 'Max';
const myPossibleNames: possibleNames = 'Oliver';


// Interfaces
interface Point {
  readonly id: ID,
  latitude: number,
  longitude: number,
  title?: string,
}

const point1: Point = {
  id: 13,
  latitude: 47.08,
  longitude: 35.03,
  // title: 'red',
}

const point2 = {} as Point; // type assert
const point3 = <Point>{};


// Interfaces Implement
interface Marker extends Point {
  icon?: string,
  setMap: (map: object) => void,
}

class Cluster implements Marker {
  id: number = 26;
  latitude: number = 47.08;
  longitude: number = 35.03;

  setMap(map: object): void {}
}

// if object has too many keys (border, padding etc.) we can't describe it all
interface Style {
  [key: string]: string,
}

const css: Style = {
  border: '1px solid red',
};


// Class
class Animal {
  public name: string | undefined; // public by default
  protected owner: string; // access from all extends classes
  private voice() {} // only inside this class

  constructor() {
    this.owner = 'Oliver';
    this.voice();
  }
}

class Bird extends Animal {
  // voice() {} -> Error! voice() is private function
  name: string = 'Richard';
  owner: string = 'Oliver';
}


// Abstract. Описание методов классов, которые будут наследоваться от этого
abstract class Api {
  abstract get(): object;
  abstract post(): object;
}

class Fetch extends Api {
  get() {
    return {};
  }
  post() {
    return {};
  }
}



// Generic type <T> - одна и таже функция работает с разными типами данных
const nums: Array<number> = [1, 2, 3, 4, 5];
const strs: Array<string> = ['one', 'two', 'three'];

function reverse<T>(arr: T[]): T[] {
  return arr.reverse();
}

reverse(nums);
reverse(strs);


// Keyof
interface Person {
  name: string,
  age: number,
}

type PersonKeys = keyof Person; // 'name' | 'age'
const friend: PersonKeys = 'name' || 'age'; // other values emit error


// create type from other type
type User = {
  id: number,
  name: string,
  age: number,
  married: boolean,
}

type userWithNoNameAndAge = Exclude<keyof User, 'name' | 'age'>; // valid keys: id, married
type userWithNoMarried = Pick<User, 'name' | 'age'>; // valid keys: id, name, age

const user1: userWithNoNameAndAge = 'id';
const user2: userWithNoMarried = {
  name: 'Oliver',
  age: 12,
};


// Advanced course
const btn: HTMLElement = document.getElementById('btn')!; // ! -> я уверен, что кнопка не null
btn.addEventListener('click', () => {
  console.log('clicked');
});

const promise1 = () => new Promise<string>((resolve) =>
  resolve('resolved')
);
promise1().then(data => { // data: string
  console.log(data);
});

const promise2: Promise<string[]> = new Promise((resolve) => {
  resolve(['']);
});

function merge<T extends object, R extends object>(a: T, b: R): T & R {
  return Object.assign({}, a, b);
}
const merged = merge({ name: 'Oliver' }, { age: 26 });
console.log(merged.name);

function withCount(value: string): { value: string, count: string} {
  return {
    value,
    count: `count: ${value.length}`,
  };
}
withCount('asdasd').count

function getObjectKey<T extends object, R extends keyof T>(obj: T, key: R) {
  return obj[key];
}
console.log(getObjectKey({ name: 'Oliver' }, 'name'));
console.log(getObjectKey({ name: 'Oliver' }, 'age'));
