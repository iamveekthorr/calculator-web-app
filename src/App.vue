<template>
  <main class="app-container" :class="{ 'align-center': !matches }">
    <section class="flex flex-col gap-2">
      <div class="screen">{{ displayValue }}</div>
      <div class="grid grid-col-4 gap-2 button-key-pad" :class="{ 'flex-should-grow': matches }">
        <div v-for="button in buttons" :key="button.label" :class="button.classes" @click="handleClick(button)">
          <p>{{ button.label }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMediaQuery } from './composable/useMediaQuery.composable'

const { matches } = useMediaQuery('(max-width: 541px)');

/** Creating types in typescript allows us to have 
 * type safety while writing code, to avoid values that are undefined,
 * which used to be the major issue while using vanilla (pure) JavaScript.
 * 
 * In this case we define a type using the type keyword followed by the 
 * name of the type, in our case we name it @type IButtonProps.
 * Thi type will allow us to define the properties/shape of a particular object,
 * allowing the typescript complier know the properties that exists on the object.
 */
type IButtonProps = {
  label: string,
  type: string,
  classes: string
}

//  We make use of the type we created above, by passing it as a type
//  to the Array!. An array is a Generic type that takes in any DataType.  
const buttons = ref<Array<IButtonProps>>([
  {
    label: '7',
    type: 'number',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '8', type: 'number',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '9',
    type: 'number',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: 'del',
    type: 'delete',
    classes: 'text-align-center cursor-pointer btn number-keys text-transform-uppercase function-keys'
  },
  {
    label: '4', type: 'number',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '5',
    type: 'number',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '6',
    type: 'number',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '÷',
    type: 'operator',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },

  {
    label: '1',
    type: 'number',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '2',
    type: 'number',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '3',
    type: 'number',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: 'x',
    type: 'operator',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '-',
    type: 'operator',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '0',
    type: 'number',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '.',
    type: 'dot',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: '+',
    type: 'operator',
    classes: 'text-align-center cursor-pointer btn number-keys'
  },
  {
    label: 'reset',
    type: 'reset',
    classes: 'grid-span-2 text-align-center cursor-pointer text-transform-uppercase function-keys flex align-center justify-center'
  },
  {
    label: '=',
    type: 'equal',
    classes: 'grid-span-2 text-align-center cursor-pointer flex align-center justify-center equal-btn'
  },
])

/* A ref in Vue is a reactive object!. 
  This means that we Vue will help us keep tract of changes
  to the variables.
 */
const currentInput = ref<string>('0');
const previousValue = ref<number>(0)
const displayValue = ref<string>('')
const operator = ref<string>('')

const updateDisplay = () => {
  displayValue.value = currentInput.value.toString();
}

const handleClick = (val: IButtonProps) => {
  /** We use a switch-case statement here because
   *  it contains only a single expression. and it's evaluated once
   * as opposed to the if-else statement, which would have multiple expressions
   * to be evaluated, one at a time, which is much slower in cases where we have multiple expressions
   * which is our case.
   * 
   * Here we are checking for which type 
   * came in from the button that was clicked, this helps us to know 
   * which function to execute!.
   */
  switch (val.type) {
    case 'dot':
      handleDot()
      break;
    case 'number':
      handleNumber(val.label);
      break;
    case 'operator':
      handleOperator(val.label)
      break;
    case 'equal':
      calculate();
      break;
    case 'reset':
      handleReset()
      break;
    case 'delete':
      handleDelete()
      break;
    default: break;
  }
}

const handleNumber = (val: string) => {
  if (currentInput.value === '0' || currentInput.value === '-0') {
    currentInput.value = val;
  } else {
    currentInput.value += val;
  }
  updateDisplay();
}

const handleOperator = (opr: string) => {
  operator.value = opr;
  previousValue.value = parseFloat(currentInput.value);
  currentInput.value = '';
}

const handleDot = () => {
  if (!currentInput.value.includes('.')) {
    currentInput.value += '.';
    updateDisplay();
  }
}


// A function to calculate an outcome based on the operator.
const calculate = () => {
  /*  create a variable to house the current value,
    and convert it to a float point number using the parseFloat function in JavaScript
    this function takes in a string as an argument and returns a number as the output.
    a number is a Data Type in Javascript. 
    
    Javascript has a several data types which include
    - String - A string is a collection of characters or a single character in a single or double quote. \
              eg('testing', 'a')
    - Boolean - This represents true or false values
    - Number - This could be an integer or a floating point number eg(1.0...)
    - Object - The Object type represents one of JavaScript's data types. 
              It is used to store various keyed collections and more complex entities.
    - Null 
    - Undefined
    - Bigint
    - Symbol
    
    
    A Variable in Javascript can hold several Data Types, as Javascript is a dynamic programming
    language. This means that you do not have to define the type, as JavaScript does 
    something called Type Inference. Which simply means that Javascript will figure out the
    data type at runtime. 
    
    Although this project is built using Typescript, which is a Superset of JavaScript.
    This means that although we are writing Javascript, we can still have Type Safety. 
    
  */
  const currentValue = parseFloat(currentInput.value);

  // only perform calculation if there is a previous and current value
  if (currentValue && previousValue.value) {
    switch (operator.value) {
      case '+':
        currentInput.value = (previousValue.value + currentValue).toString();
        break;
      case '-':
        currentInput.value = (previousValue.value - currentValue).toString();
        break;
      case 'x':
        currentInput.value = (previousValue.value * currentValue).toString();
        break;
      case '÷':
        currentInput.value = (previousValue.value / currentValue).toString();
        break;
      default:
        break;
    }
  }
  operator.value = '';
  previousValue.value = 0;
  updateDisplay();

}

const handleReset = () => {
  currentInput.value = '0';
  previousValue.value = 0;
  displayValue.value = '';
  operator.value = '';
}

const handleDelete = () => {
  if (currentInput.value.length) {
    currentInput.value = currentInput.value.slice(0, -1);
    updateDisplay();
  }
}
</script>

<style scoped>
.grid {
  /* This is the new CSS layout model
    setting display to grid overrides the
    element's default display property. 
    
    This is one out of many layout models. 
    Some common layout models include
    
    - Flexbox - With the Flexbox model, you get a single dimension of just rows, 
                although the flexbox model can help you achieve columns, by changing
                the default direction which is row to column, the flexbox model works primarily
                on the x axis of the screen. 
    - Grid - The Grid layout model ensures seamless development of complex
            layouts. This can be paid with the Flexbox model.
            The Grid layout model was developed primarily for the development of 
            Two Dimensional layouts, where a layout may have rows and columns. 
            eg(X - axis, Y - axis)
            
    - Float - This is a very powerful, but old way of creating Two Dimensional layouts. 
              The float technology was often difficult to scale and
              was a huge problem when it came to complex layouts.
  */
  display: grid;
}

.grid-col-4 {
  /* This property tells our grid how many columns it can have, along with their width!. 
    The 1fr means that the elements should take equal spacing in the grid.
    Where fr stands for Fraction. The fr is a standard way of measurement
    when using the grid layout model.
      */
  grid-template-columns: repeat(4, 1fr);
}

.grid-span-2 {
  /* This tells our grid that an element should span 2 columns. */
  grid-column: span 2;
}

.text-align-center {
  text-align: center;
}

.cursor-pointer {
  /* This is to change the style of the mouse when using a computer.
    One major reason this is done is so that the webpage can be ACCESSIBLE. 
    When this is not set, the user will not know if the element is clickable, 
    hence making the webpage inaccessible. 
  */
  cursor: pointer;
}

.gap-2 {
  gap: 2rem;
}

.btn {
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 3px;
  font-size: 2.4rem;
}

.btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2);
}

.button-key-pad {
  /* HSL stands for Hue Saturation Lightness
    it is a CSS function that takes in 3 values for 
    each of the aforementioned letters. 
    HSL is one out of many ways CSS can apply colors on a webpage.
    
    Other color models includes, but not limited to :
    - RGB - (Red, Green, Blue)
    - Hexadecimals eg(#ffffff - which stands for white)
    - RGBA - 
        This sis for applying opacity to the color - 
        (opacity - is the lightness or darkness in a color)
        RGBA is short for Red, Green, Blue, Alpha. WHere Alpha is the amount of light or darkness
        to be applied. This can range from 0.0 - 1.0. Where 1 is the fully opaque,
        and 0 is fully transparent. 
    - HSLA - This is for applying opacity to the HSL color model.
  */
  background-color: #213547;
  padding: 2rem;
}

.number-keys {
  background-color: hsl(30, 25%, 89%);
  /* The color property is used ti set the color of the texts in css */
  color: hsl(225, 21%, 49%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.function-keys {
  background-color: hsl(225, 21%, 49%);
  color: hsl(0, 0%, 100%);
  font-size: 2.4rem;
  padding: 1rem 2rem;
}

.equal-btn {
  background-color: hsl(6, 63%, 50%);
  color: hsl(0, 0%, 100%);
  border-radius: 3px;
  font-size: 2.4rem;
  padding: 1rem 2rem;
}

.screen {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #213547;
  color: hsl(0, 0%, 100%);
  height: 8rem;
  padding: 1rem 2rem;
  font-size: 2.4rem;
}

.text-transform-uppercase {
  text-transform: uppercase;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-should-grow {
  flex-grow: 1;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.app-container {
  height: 100vh;
  display: flex;
  padding: 2rem 0;
}
</style> 
