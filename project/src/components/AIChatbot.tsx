import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, X } from "lucide-react";

type Message = {
  id: number;
  text: string;
  isBot: boolean;
};

const predefinedAnswers: Record<string, string> = {
  // Variables
  "what is variable": "A variable is a named space in memory used to store data. Example in C: int age = 25;",
  "tell me about variable": "A variable is used to store data that can change. Example: int x = 10;",
  "explain variable": "Variables hold values in memory during program execution.",

  // Keywords
  "what is keyword": "A keyword is a reserved word in a language, like int, class, return.",
  "tell me about keyword": "Keywords are special words used by compilers and cannot be used as variable names.",

  // Loops
  "what is loop": "A loop repeats a block of code. Example in C: for(int i=0; i<5; i++) { printf(\"%d\", i); }",
  "example of loop": "C: for(int i=0; i<3; i++) { printf(\"%d\", i); }\nJava: for(int i=0; i<3; i++) { System.out.println(i); }",
  "tell me about loop": "A loop allows code to run repeatedly until a condition is false.",
  "explain loop": "Loops include for, while, and do-while. Used to repeat code.",
  "loop in c": "for(int i=0; i<5; i++) { printf(\"%d\", i); }",

  // Class & Object
  "what is class": "A class is a blueprint for objects. Example: class Car { String color; void drive() {} }",
  "what is object": "An object is an instance of a class with state and behavior.",
  "tell me about class": "A class defines structure and behavior using variables and methods.",
  "tell me about object": "Objects are created from classes and represent real-world entities.",

  // OOP
  "what is oop": "OOP means Object-Oriented Programming. Key concepts: Inheritance, Polymorphism, Abstraction, Encapsulation.",
  "what is inheritance": "Inheritance lets a class inherit properties from another. Example: class Dog extends Animal {}",
  "what is polymorphism": "Polymorphism lets methods behave differently based on the object. Example: method overloading.",
  "what is encapsulation": "Encapsulation binds data and methods, hiding internal details.",
  "what is abstraction": "Abstraction hides complexity and shows only essentials.",

  // Arrays & Pointers
  "what is array": "An array stores multiple values in one variable. Example: int arr[3] = {1, 2, 3};",
  "what is pointer": "A pointer stores the memory address of another variable. Example: int *p = &x;",

  // Functions
  "what is function": "A function is a reusable block of code. Example in C: int add(int a, int b) { return a + b; }",

  // Constructor / Destructor
  "what is constructor": "A constructor initializes an object when it is created.",
  "what is destructor": "A destructor releases resources when an object is destroyed.",

  // Comparisons
  "difference between c and c++": "C is procedural; C++ supports OOP with classes.",
  "difference between java and c++": "Java is platform-independent and uses JVM; C++ is compiled and closer to hardware.",

  // Conditionals
  "what is if else": "if-else is used for decision making. Example: if (x > y) { ... } else { ... }"
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotReply = async (userText: string): Promise<string> => {
    const cleanedText = userText.trim().toLowerCase();
    const answer = predefinedAnswers[cleanedText];
    return answer || "❓ Sorry, I don't understand that question yet.";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const reply = await generateBotReply(input);

    const botReply: Message = {
      id: Date.now() + 1,
      text: reply,
      isBot: true,
    };

    setMessages((prev) => [...prev, botReply]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
     
     <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center space-y-1">
  {/* Tooltip Message */}
  {!isOpen && (
    <div className="mb-2 bg-white text-gray-900 text-sm px-3 py-1 rounded-full shadow-md animate-bounce">
      I'm here to help!
    </div>
  )}

  {/* Floating Button */}
  <button
    className="p-4 rounded-full shadow-2xl transition transform hover:scale-110 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 animate-pulse hover:animate-none"
    onClick={toggleChat}
  >
    <div className="text-white">
      {isOpen ? <X size={30} /> : <Bot size={30} />}
    </div>
  </button>
</div>


      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 h-[400px] bg-gray-900 text-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-3 bg-purple-800 font-semibold flex items-center gap-2">
            <Bot size={16} /> Zog AI Assistant
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] text-sm whitespace-pre-wrap ${
                    msg.isBot ? "bg-purple-600" : "bg-blue-600"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-gray-700 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-2 rounded bg-gray-800 text-white outline-none"
              placeholder="Ask me about loops, if-else..."
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-purple-700 hover:bg-purple-800 rounded"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
