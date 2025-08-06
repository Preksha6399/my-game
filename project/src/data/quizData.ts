export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Phase {
  id: string;
  name: string;
  theme: {
    background: string;
    primaryColor: string;
    secondaryColor: string;
    alienColor: string;
  };
  levels: QuizQuestion[];
}

export const quizData: Phase[] = [
  {
    id: 'c-galaxy',
    name: 'C Galaxy',
    theme: {
      background: 'from-blue-900 via-cyan-900 to-indigo-900',
      primaryColor: '#00ffff',
      secondaryColor: '#0ea5e9',
      alienColor: '#4ade80'
    },
    levels: [
      {
        id: 'Level_C_1',
        question: 'What is the correct syntax of main() in C?',
        options: ['main()', 'int main()', 'void main()', 'main(void)'],
        correctAnswer: 1,
        explanation: 'int main() is the standard way to declare the main function in C.'
      },
      {
        id: 'Level_C_2',
        question: 'Which header file is needed for printf()?',
        options: ['<stdlib.h>', '<stdio.h>', '<string.h>', '<math.h>'],
        correctAnswer: 1,
        explanation: 'stdio.h contains declarations for input/output functions like printf().'
      },
      {
        id: 'Level_C_3',
        question: 'What does the & operator do in C?',
        options: ['Logical AND', 'Bitwise AND', 'Address of', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'The & operator can be both bitwise AND and address-of operator depending on context.'
      },
      {
        id: 'Level_C_4',
        question: 'Which is the correct way to declare an integer variable?',
        options: ['int x;', 'integer x;', 'Int x;', 'int: x;'],
        correctAnswer: 0,
        explanation: 'int x; is the correct syntax to declare an integer variable in C.'
      },
      {
        id: 'Level_C_5',
        question: 'What is the size of int in most modern systems?',
        options: ['2 bytes', '4 bytes', '8 bytes', '1 byte'],
        correctAnswer: 1,
        explanation: 'On most modern 32-bit and 64-bit systems, int is typically 4 bytes.'
      },
      {
        id: 'Level_C_6',
        question: 'Which loop executes at least once?',
        options: ['for loop', 'while loop', 'do-while loop', 'none'],
        correctAnswer: 2,
        explanation: 'do-while loop checks condition after execution, so it runs at least once.'
      },
      {
        id: 'Level_C_7',
        question: 'What does malloc() return?',
        options: ['int pointer', 'void pointer', 'char pointer', 'nothing'],
        correctAnswer: 1,
        explanation: 'malloc() returns a void pointer that can be cast to any data type.'
      },
      {
        id: 'Level_C_8',
        question: 'Which operator has highest precedence?',
        options: ['*', '+', '()', '='],
        correctAnswer: 2,
        explanation: 'Parentheses () have the highest precedence in C expressions.'
      },
      {
        id: 'Level_C_9',
        question: 'What is the correct way to comment in C?',
        options: ['// comment', '/* comment */', '# comment', 'Both A and B'],
        correctAnswer: 3,
        explanation: 'C supports both // for single line and /* */ for multi-line comments.'
      },
      {
        id: 'Level_C_10',
        question: 'Which function is used to read a string?',
        options: ['scanf()', 'gets()', 'fgets()', 'All of above'],
        correctAnswer: 3,
        explanation: 'All three functions can read strings, though fgets() is safer than gets().'
      },
      {
        id: 'Level_C_11',
        question: 'What does the break statement do?',
        options: ['Exits program', 'Exits loop', 'Skips iteration', 'Pauses execution'],
        correctAnswer: 1,
        explanation: 'break statement exits the current loop or switch statement.'
      },
      {
        id: 'Level_C_12',
        question: 'Which is not a valid C data type?',
        options: ['int', 'float', 'boolean', 'char'],
        correctAnswer: 2,
        explanation: 'C does not have a built-in boolean data type (added in C99 as _Bool).'
      },
      {
        id: 'Level_C_13',
        question: 'What is the correct syntax for if statement?',
        options: ['if x > 5', 'if (x > 5)', 'if {x > 5}', 'if [x > 5]'],
        correctAnswer: 1,
        explanation: 'if statements in C require parentheses around the condition.'
      },
      {
        id: 'Level_C_14',
        question: 'Which function deallocates memory?',
        options: ['free()', 'delete()', 'remove()', 'clear()'],
        correctAnswer: 0,
        explanation: 'free() is used to deallocate memory allocated by malloc(), calloc(), or realloc().'
      },
      {
        id: 'Level_C_15',
        question: 'What does the continue statement do?',
        options: ['Exits loop', 'Skips current iteration', 'Restarts loop', 'Pauses execution'],
        correctAnswer: 1,
        explanation: 'continue statement skips the rest of the current iteration and moves to the next.'
      }
    ]
  },
  {
    id: 'cpp-galaxy',
    name: 'C++ Galaxy',
    theme: {
      background: 'from-purple-900 via-pink-900 to-indigo-900',
      primaryColor: '#ff00ff',
      secondaryColor: '#a855f7',
      alienColor: '#ec4899'
    },
    levels: [
      {
        id: 'Level_CPP_1',
        question: 'What is the main difference between C and C++?',
        options: ['Syntax', 'Object-Oriented Programming', 'Speed', 'Memory usage'],
        correctAnswer: 1,
        explanation: 'C++ extends C with object-oriented programming features like classes and objects.'
      },
      {
        id: 'Level_CPP_2',
        question: 'Which header is used for input/output in C++?',
        options: ['<stdio.h>', '<iostream>', '<conio.h>', '<fstream>'],
        correctAnswer: 1,
        explanation: '<iostream> provides cin, cout, and other I/O stream objects in C++.'
      },
      {
        id: 'Level_CPP_3',
        question: 'What is the correct way to declare a class?',
        options: ['class MyClass {}', 'Class MyClass {}', 'class: MyClass {}', 'CLASS MyClass {}'],
        correctAnswer: 0,
        explanation: 'class MyClass {} is the correct syntax to declare a class in C++.'
      },
      {
        id: 'Level_CPP_4',
        question: 'Which access specifier is default for class members?',
        options: ['public', 'private', 'protected', 'none'],
        correctAnswer: 1,
        explanation: 'Class members are private by default in C++.'
      },
      {
        id: 'Level_CPP_5',
        question: 'What is a constructor?',
        options: ['Destroys objects', 'Creates objects', 'Initializes objects', 'Copies objects'],
        correctAnswer: 2,
        explanation: 'A constructor is a special method that initializes objects when they are created.'
      },
      {
        id: 'Level_CPP_6',
        question: 'Which operator is used for dynamic memory allocation?',
        options: ['malloc', 'new', 'alloc', 'create'],
        correctAnswer: 1,
        explanation: 'The new operator is used for dynamic memory allocation in C++.'
      },
      {
        id: 'Level_CPP_7',
        question: 'What is function overloading?',
        options: ['Multiple functions with same name', 'Functions with no parameters', 'Virtual functions', 'Static functions'],
        correctAnswer: 0,
        explanation: 'Function overloading allows multiple functions with the same name but different parameters.'
      },
      {
        id: 'Level_CPP_8',
        question: 'Which is NOT a pillar of OOP?',
        options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Compilation'],
        correctAnswer: 3,
        explanation: 'The four pillars of OOP are Encapsulation, Inheritance, Polymorphism, and Abstraction.'
      },
      {
        id: 'Level_CPP_9',
        question: 'What does the virtual keyword do?',
        options: ['Makes function static', 'Enables polymorphism', 'Hides function', 'Makes function inline'],
        correctAnswer: 1,
        explanation: 'virtual keyword enables runtime polymorphism through virtual function calls.'
      },
      {
        id: 'Level_CPP_10',
        question: 'Which is the correct way to inherit a class?',
        options: ['class B extends A', 'class B : A', 'class B : public A', 'class B inherits A'],
        correctAnswer: 2,
        explanation: 'class B : public A is the correct syntax for public inheritance in C++.'
      },
      {
        id: 'Level_CPP_11',
        question: 'What is a destructor?',
        options: ['Creates objects', 'Initializes objects', 'Cleans up objects', 'Copies objects'],
        correctAnswer: 2,
        explanation: 'A destructor is called when an object is destroyed to clean up resources.'
      },
      {
        id: 'Level_CPP_12',
        question: 'Which operator deallocates memory in C++?',
        options: ['free', 'delete', 'remove', 'clear'],
        correctAnswer: 1,
        explanation: 'The delete operator is used to deallocate memory allocated with new.'
      },
      {
        id: 'Level_CPP_13',
        question: 'What is the scope resolution operator?',
        options: ['::', '->', '.', '&'],
        correctAnswer: 0,
        explanation: 'The :: operator is used to access global variables and class members.'
      },
      {
        id: 'Level_CPP_14',
        question: 'What is method overriding?',
        options: ['Same method in different classes', 'Redefining inherited method', 'Multiple methods with same name', 'Static method definition'],
        correctAnswer: 1,
        explanation: 'Method overriding is redefining a virtual method from the base class in derived class.'
      },
      {
        id: 'Level_CPP_15',
        question: 'Which is true about abstract classes?',
        options: ['Cannot be instantiated', 'Have only virtual functions', 'Cannot have constructors', 'Are always empty'],
        correctAnswer: 0,
        explanation: 'Abstract classes contain pure virtual functions and cannot be instantiated directly.'
      }
    ]
  },
  {
    id: 'java-galaxy',
    name: 'Java Galaxy',
    theme: {
      background: 'from-orange-900 via-red-900 to-yellow-900',
      primaryColor: '#fbbf24',
      secondaryColor: '#f97316',
      alienColor: '#ef4444'
    },
    levels: [
      {
        id: 'Level_Java_1',
        question: 'What is the main method signature in Java?',
        options: ['public static void main(String args[])', 'public void main(String args[])', 'static void main(String args[])', 'public main(String args[])'],
        correctAnswer: 0,
        explanation: 'The main method must be public, static, void, and take String array as parameter.'
      },
      {
        id: 'Level_Java_2',
        question: 'Which is NOT a Java primitive data type?',
        options: ['int', 'boolean', 'String', 'char'],
        correctAnswer: 2,
        explanation: 'String is a class in Java, not a primitive data type.'
      },
      {
        id: 'Level_Java_3',
        question: 'What does JVM stand for?',
        options: ['Java Virtual Machine', 'Java Variable Method', 'Java Version Manager', 'Java Visual Model'],
        correctAnswer: 0,
        explanation: 'JVM (Java Virtual Machine) executes Java bytecode and provides platform independence.'
      },
      {
        id: 'Level_Java_4',
        question: 'Which keyword is used to inherit a class?',
        options: ['inherits', 'extends', 'implements', 'super'],
        correctAnswer: 1,
        explanation: 'The extends keyword is used for class inheritance in Java.'
      },
      {
        id: 'Level_Java_5',
        question: 'What is encapsulation?',
        options: ['Hiding implementation details', 'Creating multiple classes', 'Using interfaces', 'Method overloading'],
        correctAnswer: 0,
        explanation: 'Encapsulation is the bundling of data and methods that operate on that data within a single unit.'
      },
      {
        id: 'Level_Java_6',
        question: 'Which access modifier provides the widest access?',
        options: ['private', 'protected', 'public', 'default'],
        correctAnswer: 2,
        explanation: 'public access modifier allows access from anywhere in the program.'
      },
      {
        id: 'Level_Java_7',
        question: 'What is the difference between == and equals()?',
        options: ['No difference', '== compares references, equals() compares content', '== compares content, equals() compares references', 'Both compare content'],
        correctAnswer: 1,
        explanation: '== compares object references while equals() method compares object content.'
      },
      {
        id: 'Level_Java_8',
        question: 'Which is true about interfaces?',
        options: ['Can have constructors', 'Methods are abstract by default', 'Can be instantiated', 'Support multiple inheritance'],
        correctAnswer: 3,
        explanation: 'Java supports multiple inheritance through interfaces, not classes.'
      },
      {
        id: 'Level_Java_9',
        question: 'What is polymorphism?',
        options: ['One interface, multiple implementations', 'Multiple interfaces, one implementation', 'Creating objects', 'Destroying objects'],
        correctAnswer: 0,
        explanation: 'Polymorphism allows objects of different types to be treated as objects of a common base type.'
      },
      {
        id: 'Level_Java_10',
        question: 'Which collection allows duplicate elements?',
        options: ['Set', 'List', 'Map', 'None'],
        correctAnswer: 1,
        explanation: 'List interface allows duplicate elements, while Set does not.'
      },
      {
        id: 'Level_Java_11',
        question: 'What is the purpose of finally block?',
        options: ['Handle exceptions', 'Execute code always', 'Throw exceptions', 'Catch exceptions'],
        correctAnswer: 1,
        explanation: 'finally block executes regardless of whether an exception occurs or not.'
      },
      {
        id: 'Level_Java_12',
        question: 'Which is true about static methods?',
        options: ['Can access instance variables', 'Belong to class, not instance', 'Can be overridden', 'Require object creation'],
        correctAnswer: 1,
        explanation: 'Static methods belong to the class and can be called without creating an instance.'
      },
      {
        id: 'Level_Java_13',
        question: 'What is garbage collection?',
        options: ['Manual memory management', 'Automatic memory management', 'Error handling', 'Code optimization'],
        correctAnswer: 1,
        explanation: 'Garbage collection automatically reclaims memory used by objects that are no longer referenced.'
      },
      {
        id: 'Level_Java_14',
        question: 'Which keyword is used to implement an interface?',
        options: ['extends', 'implements', 'inherits', 'uses'],
        correctAnswer: 1,
        explanation: 'The implements keyword is used to implement an interface in Java.'
      },
      {
        id: 'Level_Java_15',
        question: 'What is the difference between abstract class and interface?',
        options: ['No difference', 'Abstract class can have concrete methods', 'Interface can have constructors', 'Abstract class supports multiple inheritance'],
        correctAnswer: 1,
        explanation: 'Abstract classes can have both abstract and concrete methods, while interfaces (before Java 8) had only abstract methods.'
      }
    ]
  }
];