import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Globe, Layout, Code, Cpu, Database, Coffee, Terminal,
  Star, Zap, Target, Menu, CheckCircle, XCircle, Award,
  BookOpen, Trophy, Sparkles
} from "lucide-react";
import axios from "axios";

const API_BASE = "https://quizapp-fhss.onrender.com";

const questionsData = {
  html: {
    basic: [
      { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctAnswer: 0 },
      { question: "Which tag is used for the largest heading?", options: ["<h6>", "<h1>", "<heading>", "<head>"], correctAnswer: 1 },
      { question: "Which tag creates a paragraph?", options: ["<p>", "<para>", "<pg>", "<text>"], correctAnswer: 0 },
      { question: "Which tag creates a hyperlink?", options: ["<link>", "<href>", "<a>", "<url>"], correctAnswer: 2 },
      { question: "Which tag inserts an image?", options: ["<image>", "<img>", "<pic>", "<src>"], correctAnswer: 1 },
    ],
    intermediate: [
      { question: "Which attribute specifies an alternate text for an image?", options: ["title", "src", "alt", "href"], correctAnswer: 2 },
      { question: "What is the correct HTML for creating a checkbox?", options: ['<input type="check">', '<input type="checkbox">', '<checkbox>', '<check>'], correctAnswer: 1 },
      { question: "Which HTML element defines navigation links?", options: ["<navigate>", "<nav>", "<navigation>", "<links>"], correctAnswer: 1 },
      { question: "What does the <meta> tag do?", options: ["Creates metadata", "Creates a table", "Creates a link", "Creates a form"], correctAnswer: 0 },
      { question: "Which attribute is used to open a link in a new tab?", options: ['target="_blank"', 'target="_new"', 'target="_tab"', 'open="new"'], correctAnswer: 0 },
    ],
    advanced: [
      { question: "Which HTML5 element is used for drawing graphics?", options: ["<svg>", "<canvas>", "<draw>", "<graphic>"], correctAnswer: 1 },
      { question: "What is the purpose of the <datalist> element?", options: ["Creates a list", "Provides autocomplete options for input", "Creates a database", "Displays data"], correctAnswer: 1 },
      { question: "Which attribute makes an input field required?", options: ["mandatory", "required", "validate", "must"], correctAnswer: 1 },
      { question: "What does the 'defer' attribute do in a script tag?", options: ["Deletes the script", "Loads script after HTML parsing", "Disables the script", "Delays by 1 second"], correctAnswer: 1 },
      { question: "Which element represents a self-contained composition?", options: ["<section>", "<div>", "<article>", "<aside>"], correctAnswer: 2 },
    ],
  },
  css: {
    basic: [
      { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"], correctAnswer: 0 },
      { question: "Which property changes text color?", options: ["font-color", "text-color", "color", "foreground"], correctAnswer: 2 },
      { question: "Which property sets background color?", options: ["bg-color", "background-color", "back-color", "color-background"], correctAnswer: 1 },
      { question: "How do you select an element with id 'demo'?", options: [".demo", "#demo", "demo", "*demo"], correctAnswer: 1 },
      { question: "How do you select elements with class 'test'?", options: ["#test", ".test", "test", "*test"], correctAnswer: 1 },
    ],
    intermediate: [
      { question: "Which property controls the space between elements?", options: ["spacing", "margin", "padding", "border"], correctAnswer: 1 },
      { question: "What is the default value of position property?", options: ["relative", "absolute", "fixed", "static"], correctAnswer: 3 },
      { question: "Which display value makes elements inline-block?", options: ["display: inline", "display: block", "display: inline-block", "display: flex"], correctAnswer: 2 },
      { question: "Which property makes text bold?", options: ["font-style: bold", "font-weight: bold", "text-weight: bold", "font: bold"], correctAnswer: 1 },
      { question: "What does z-index control?", options: ["Zoom level", "Stack order of elements", "Size of element", "Position from left"], correctAnswer: 1 },
    ],
    advanced: [
      { question: "Which CSS property creates a flexible box layout?", options: ["display: grid", "display: flex", "display: box", "display: flex-box"], correctAnswer: 1 },
      { question: "What does the 'rem' unit refer to?", options: ["Root element font size", "Relative to parent", "Screen width", "Pixel ratio"], correctAnswer: 0 },
      { question: "Which pseudo-class selects the first child?", options: [":first", ":first-element", ":first-child", ":child-first"], correctAnswer: 2 },
      { question: "What is the CSS Grid property to define columns?", options: ["grid-template-columns", "grid-columns", "columns", "grid-col"], correctAnswer: 0 },
      { question: "Which property adds shadow to text?", options: ["box-shadow", "text-shadow", "font-shadow", "shadow"], correctAnswer: 1 },
    ],
  },
  js: {
    basic: [
      { question: "Which keyword declares a variable in modern JS?", options: ["var", "let", "const", "Both let and const"], correctAnswer: 3 },
      { question: "What does console.log() do?", options: ["Creates a log file", "Prints to browser console", "Sends data to server", "Opens a dialog"], correctAnswer: 1 },
      { question: "Which symbol is used for strict equality?", options: ["==", "=", "===", "!=="], correctAnswer: 2 },
      { question: "How do you write a comment in JavaScript?", options: ["<!-- comment -->", "// comment", "** comment **", "## comment"], correctAnswer: 1 },
      { question: "Which method adds an element to end of an array?", options: ["push()", "add()", "append()", "insert()"], correctAnswer: 0 },
    ],
    intermediate: [
      { question: "What does 'typeof null' return?", options: ["null", "undefined", "object", "string"], correctAnswer: 2 },
      { question: "Which method converts JSON string to object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"], correctAnswer: 0 },
      { question: "What is a closure in JavaScript?", options: ["A way to close browser", "Function with access to outer scope", "A loop that closes", "An error handler"], correctAnswer: 1 },
      { question: "Which array method creates a new filtered array?", options: ["map()", "forEach()", "filter()", "reduce()"], correctAnswer: 2 },
      { question: "What does 'async/await' handle?", options: ["Synchronous code", "Asynchronous code", "Error handling", "DOM manipulation"], correctAnswer: 1 },
    ],
    advanced: [
      { question: "What is the event loop in JavaScript?", options: ["A for loop", "Mechanism handling async operations", "A DOM event", "A CSS animation"], correctAnswer: 1 },
      { question: "What does the spread operator (...) do?", options: ["Multiplies values", "Spreads iterable elements", "Creates a loop", "Declares variables"], correctAnswer: 1 },
      { question: "Which method creates a new array by transforming each element?", options: ["filter()", "reduce()", "map()", "forEach()"], correctAnswer: 2 },
      { question: "What is a Promise in JavaScript?", options: ["A guarantee", "Object representing future async result", "A function", "A variable type"], correctAnswer: 1 },
      { question: "What is prototypal inheritance?", options: ["Class-based inheritance", "Objects inheriting from other objects", "Function inheritance", "Module inheritance"], correctAnswer: 1 },
    ],
  },
  react: {
    basic: [
      { question: "What is React?", options: ["A server-side language", "A JavaScript UI library", "A database", "A CSS framework"], correctAnswer: 1 },
      { question: "What is JSX?", options: ["JavaScript XML syntax", "Java Standard Extension", "JSON Extension", "JavaScript Extra"], correctAnswer: 0 },
      { question: "Which hook manages state in functional components?", options: ["useEffect", "useRef", "useState", "useContext"], correctAnswer: 2 },
      { question: "What is a React component?", options: ["A CSS class", "A reusable UI piece", "A database table", "A server route"], correctAnswer: 1 },
      { question: "How do you pass data to a child component?", options: ["state", "props", "context", "refs"], correctAnswer: 1 },
    ],
    intermediate: [
      { question: "Which hook runs side effects in functional components?", options: ["useState", "useEffect", "useRef", "useMemo"], correctAnswer: 1 },
      { question: "What is the virtual DOM?", options: ["A browser feature", "A lightweight copy of real DOM", "A CSS property", "A JavaScript engine"], correctAnswer: 1 },
      { question: "What does key prop do in lists?", options: ["Styles the list", "Helps React identify changed items", "Sorts the list", "Filters items"], correctAnswer: 1 },
      { question: "What is React Context used for?", options: ["Styling", "Global state management", "Routing", "API calls"], correctAnswer: 1 },
      { question: "Which lifecycle method runs after render?", options: ["componentWillMount", "componentDidMount", "componentWillUpdate", "render"], correctAnswer: 1 },
    ],
    advanced: [
      { question: "What is React.memo used for?", options: ["Memory management", "Memoizing components to prevent re-renders", "Creating memos", "Caching API calls"], correctAnswer: 1 },
      { question: "What is the purpose of useCallback?", options: ["Calls functions", "Memoizes callback functions", "Creates callbacks", "Handles async"], correctAnswer: 1 },
      { question: "What is code splitting in React?", options: ["Breaking CSS", "Splitting bundle into smaller chunks", "Dividing components", "Separating logic"], correctAnswer: 1 },
      { question: "What does React.lazy() do?", options: ["Delays rendering", "Enables lazy loading of components", "Creates slow components", "Pauses execution"], correctAnswer: 1 },
      { question: "What is a custom hook?", options: ["A CSS hook", "Reusable function using React hooks", "A third-party library", "A built-in hook"], correctAnswer: 1 },
    ],
  },
  node: {
    basic: [
      { question: "What is Node.js?", options: ["A browser", "JavaScript runtime built on V8", "A database", "A CSS framework"], correctAnswer: 1 },
      { question: "Which command initializes a Node project?", options: ["node init", "npm start", "npm init", "node start"], correctAnswer: 2 },
      { question: "What is npm?", options: ["Node Package Manager", "New Project Manager", "Node Process Monitor", "Network Package Module"], correctAnswer: 0 },
      { question: "How do you import a module in Node.js?", options: ["import module", "require('module')", "include module", "use module"], correctAnswer: 1 },
      { question: "Which module handles file system operations?", options: ["http", "path", "fs", "os"], correctAnswer: 2 },
    ],
    intermediate: [
      { question: "What is Express.js?", options: ["A database", "A web framework for Node", "A testing tool", "A CSS framework"], correctAnswer: 1 },
      { question: "What is middleware in Express?", options: ["Database layer", "Functions that process requests", "Frontend code", "CSS processor"], correctAnswer: 1 },
      { question: "Which method handles GET requests in Express?", options: ["app.post()", "app.get()", "app.request()", "app.fetch()"], correctAnswer: 1 },
      { question: "What does res.json() do?", options: ["Reads JSON", "Sends JSON response", "Parses JSON", "Validates JSON"], correctAnswer: 1 },
      { question: "What is the event-driven model in Node?", options: ["DOM events", "Non-blocking I/O with callbacks", "Mouse events", "Timer events"], correctAnswer: 1 },
    ],
    advanced: [
      { question: "What is the Node.js cluster module used for?", options: ["Grouping files", "Multi-core processing", "Database clustering", "CSS clusters"], correctAnswer: 1 },
      { question: "What is streams in Node.js?", options: ["CSS animations", "Data flowing in chunks", "Video streaming", "Network requests"], correctAnswer: 1 },
      { question: "What is JWT?", options: ["JavaScript Web Tool", "JSON Web Token", "Java Web Technology", "JavaScript Widget Template"], correctAnswer: 1 },
      { question: "What is CORS?", options: ["Cross-Origin Resource Sharing", "CSS Override Rule Set", "Component Object Request System", "Central Origin Request Service"], correctAnswer: 0 },
      { question: "What does process.env contain?", options: ["Browser info", "Environment variables", "Process ID", "Memory usage"], correctAnswer: 1 },
    ],
  },
  mongodb: {
    basic: [
      { question: "What type of database is MongoDB?", options: ["Relational", "NoSQL document database", "Graph database", "Key-value store"], correctAnswer: 1 },
      { question: "What is a collection in MongoDB?", options: ["A table equivalent", "A row", "A column", "A database"], correctAnswer: 0 },
      { question: "What is a document in MongoDB?", options: ["A file", "A JSON-like data record", "A table", "A query"], correctAnswer: 1 },
      { question: "Which method inserts a document?", options: ["insert()", "insertOne()", "add()", "create()"], correctAnswer: 1 },
      { question: "Which method finds all documents?", options: ["getAll()", "find()", "select()", "fetch()"], correctAnswer: 1 },
    ],
    intermediate: [
      { question: "What is Mongoose?", options: ["A MongoDB GUI", "An ODM for MongoDB", "A query language", "A database driver"], correctAnswer: 1 },
      { question: "What does $gt operator do in MongoDB?", options: ["Greater than comparison", "Get total", "Group by", "Generate token"], correctAnswer: 0 },
      { question: "What is an index in MongoDB?", options: ["A document ID", "Structure to speed up queries", "A collection name", "A schema field"], correctAnswer: 1 },
      { question: "What does updateOne() do?", options: ["Updates all documents", "Updates first matching document", "Creates a document", "Deletes a document"], correctAnswer: 1 },
      { question: "What is aggregation in MongoDB?", options: ["Adding documents", "Processing data pipeline", "Counting records", "Grouping tables"], correctAnswer: 1 },
    ],
    advanced: [
      { question: "What is sharding in MongoDB?", options: ["Splitting data across servers", "Encrypting data", "Backing up data", "Indexing data"], correctAnswer: 0 },
      { question: "What is a replica set?", options: ["A set of indexes", "Multiple MongoDB nodes for redundancy", "A backup file", "A schema set"], correctAnswer: 1 },
      { question: "What does $lookup do in aggregation?", options: ["Finds documents", "Performs a join between collections", "Looks up indexes", "Validates schema"], correctAnswer: 1 },
      { question: "What is the purpose of TTL index?", options: ["Speed up queries", "Auto-delete documents after time", "Track time", "Create timestamps"], correctAnswer: 1 },
      { question: "What is GridFS?", options: ["A grid layout", "Spec for storing large files in MongoDB", "A CSS grid", "A file system"], correctAnswer: 1 },
    ],
  },
  java: {
    basic: [
      { question: "What is Java?", options: ["A scripting language", "Object-oriented programming language", "A database", "A framework"], correctAnswer: 1 },
      { question: "Which keyword defines a class in Java?", options: ["Class", "class", "define", "object"], correctAnswer: 1 },
      { question: "What is the main method signature in Java?", options: ["public void main()", "public static void main(String[] args)", "static main()", "void main(String args)"], correctAnswer: 1 },
      { question: "Which data type stores whole numbers?", options: ["float", "double", "int", "char"], correctAnswer: 2 },
      { question: "What does System.out.println() do?", options: ["Reads input", "Prints to console with newline", "Creates a system", "Opens a file"], correctAnswer: 1 },
    ],
    intermediate: [
      { question: "What is inheritance in Java?", options: ["Copying code", "Class acquiring properties of another", "Deleting a class", "Creating objects"], correctAnswer: 1 },
      { question: "What is an interface in Java?", options: ["A GUI element", "Abstract type with method contracts", "A variable", "A loop"], correctAnswer: 1 },
      { question: "What does the 'final' keyword do?", options: ["Ends program", "Prevents modification/override", "Creates a constant only", "Both prevents modification and override"], correctAnswer: 3 },
      { question: "What is exception handling in Java?", options: ["Deleting errors", "Managing runtime errors gracefully", "Ignoring errors", "Logging errors"], correctAnswer: 1 },
      { question: "What is the difference between == and .equals()?", options: ["No difference", "== compares references, .equals() compares values", "== compares values", ".equals() compares references"], correctAnswer: 1 },
    ],
    advanced: [
      { question: "What is Java generics?", options: ["Generic code", "Type-safe containers for any type", "A design pattern", "An interface"], correctAnswer: 1 },
      { question: "What is the Java Stream API?", options: ["Input streams", "Functional operations on collections", "Network streams", "File streams"], correctAnswer: 1 },
      { question: "What is a lambda expression?", options: ["A Greek letter", "Anonymous function shorthand", "A loop type", "A variable"], correctAnswer: 1 },
      { question: "What is the purpose of synchronized keyword?", options: ["Syncs files", "Thread-safe method/block access", "Sorts collections", "Connects databases"], correctAnswer: 1 },
      { question: "What is Java reflection?", options: ["Mirroring code", "Inspecting/modifying classes at runtime", "Recursive calls", "Error reflection"], correctAnswer: 1 },
    ],
  },
  python: {
    basic: [
      { question: "What is Python?", options: ["A snake", "High-level programming language", "A database", "A web framework"], correctAnswer: 1 },
      { question: "How do you print in Python?", options: ["console.log()", "printf()", "print()", "echo()"], correctAnswer: 2 },
      { question: "Which symbol starts a comment in Python?", options: ["//", "/*", "#", "--"], correctAnswer: 2 },
      { question: "What is a list in Python?", options: ["Immutable sequence", "Ordered mutable collection", "Key-value pairs", "A set"], correctAnswer: 1 },
      { question: "How do you define a function in Python?", options: ["function myFunc():", "def myFunc():", "func myFunc():", "define myFunc():"], correctAnswer: 1 },
    ],
    intermediate: [
      { question: "What is a dictionary in Python?", options: ["A list", "Key-value pair collection", "A tuple", "A set"], correctAnswer: 1 },
      { question: "What does len() function do?", options: ["Creates a list", "Returns length of object", "Lengthens a string", "Loops through items"], correctAnswer: 1 },
      { question: "What is list comprehension?", options: ["Compressing a list", "Concise way to create lists", "Understanding lists", "Sorting lists"], correctAnswer: 1 },
      { question: "What is a lambda function?", options: ["A Greek function", "Anonymous one-line function", "A built-in function", "A recursive function"], correctAnswer: 1 },
      { question: "What does 'import' do in Python?", options: ["Exports code", "Brings in external modules", "Creates a module", "Deletes a module"], correctAnswer: 1 },
    ],
    advanced: [
      { question: "What are decorators in Python?", options: ["CSS decorators", "Functions that modify other functions", "Design patterns", "Class methods"], correctAnswer: 1 },
      { question: "What is a generator in Python?", options: ["Code generator", "Function yielding values lazily", "Random number generator", "HTML generator"], correctAnswer: 1 },
      { question: "What is GIL in Python?", options: ["Global Interface Layer", "Global Interpreter Lock", "General Input Library", "Graphics Interface Layer"], correctAnswer: 1 },
      { question: "What is the purpose of __init__ method?", options: ["Initialize module", "Constructor for class instances", "Import method", "Interface method"], correctAnswer: 1 },
      { question: "What are *args and **kwargs?", options: ["Error handlers", "Variable positional and keyword arguments", "Array arguments", "Key arguments"], correctAnswer: 1 },
    ],
  },
  cpp: {
    basic: [
      { question: "What does C++ add to C?", options: ["Nothing", "Object-oriented features", "Web features", "Database features"], correctAnswer: 1 },
      { question: "Which operator is used for output in C++?", options: [">>", "<<", "->", "<>"], correctAnswer: 1 },
      { question: "What is 'cout' used for?", options: ["Input", "Output to console", "Comments", "Creating objects"], correctAnswer: 1 },
      { question: "Which header is needed for cout?", options: ["<stdio.h>", "<iostream>", "<string>", "<output>"], correctAnswer: 1 },
      { question: "How do you declare a constant in C++?", options: ["const int x = 5;", "constant int x = 5;", "final int x = 5;", "fixed int x = 5;"], correctAnswer: 0 },
    ],
    intermediate: [
      { question: "What is a pointer in C++?", options: ["An arrow", "Variable storing memory address", "A reference", "A function"], correctAnswer: 1 },
      { question: "What is a class in C++?", options: ["A school class", "Blueprint for objects", "A function", "A variable type"], correctAnswer: 1 },
      { question: "What is the difference between struct and class in C++?", options: ["No difference", "Default access: struct public, class private", "Struct is faster", "Class has more features"], correctAnswer: 1 },
      { question: "What does 'new' keyword do?", options: ["Creates a variable", "Allocates memory dynamically", "Creates a class", "Initializes array"], correctAnswer: 1 },
      { question: "What is operator overloading?", options: ["Too many operators", "Defining custom operator behavior", "Overriding operators", "Deleting operators"], correctAnswer: 1 },
    ],
    advanced: [
      { question: "What are templates in C++?", options: ["Design templates", "Generic programming constructs", "HTML templates", "Class patterns"], correctAnswer: 1 },
      { question: "What is RAII?", options: ["Random Access Interface Implementation", "Resource Acquisition Is Initialization", "Runtime Array Index Implementation", "Recursive Algorithm Interface"], correctAnswer: 1 },
      { question: "What is a virtual function?", options: ["Fake function", "Function overridable by derived classes", "An abstract function", "A template function"], correctAnswer: 1 },
      { question: "What is move semantics in C++11?", options: ["Moving code", "Efficient resource transfer without copying", "Moving pointers", "Shifting memory"], correctAnswer: 1 },
      { question: "What is a smart pointer?", options: ["An intelligent algorithm", "Pointer with automatic memory management", "A fast pointer", "A template pointer"], correctAnswer: 1 },
    ],
  },
  bootstrap: {
    basic: [
      { question: "What is Bootstrap?", options: ["A JavaScript framework", "CSS framework for responsive design", "A database", "A server"], correctAnswer: 1 },
      { question: "What is Bootstrap's grid system based on?", options: ["8 columns", "10 columns", "12 columns", "16 columns"], correctAnswer: 2 },
      { question: "Which class makes a button in Bootstrap?", options: [".button", ".btn", ".bootstrap-btn", ".b-button"], correctAnswer: 1 },
      { question: "Which class creates a responsive container?", options: [".wrapper", ".container", ".responsive", ".box"], correctAnswer: 1 },
      { question: "What prefix does Bootstrap 5 use for breakpoints?", options: ["bs-", "col-", "bp-", "grid-"], correctAnswer: 1 },
    ],
    intermediate: [
      { question: "Which class creates a navigation bar?", options: [".nav-bar", ".navbar", ".navigation", ".top-bar"], correctAnswer: 1 },
      { question: "What is the Bootstrap utility class for margin auto?", options: ["m-auto", "margin-auto", "mx-auto", "center"], correctAnswer: 2 },
      { question: "Which class adds a card component?", options: [".box", ".panel", ".card", ".widget"], correctAnswer: 2 },
      { question: "What does 'd-flex' class do?", options: ["Deletes flex", "Adds display flex", "Creates a grid", "Defines width"], correctAnswer: 1 },
      { question: "Which class hides element on small screens?", options: [".hide-sm", ".d-none d-md-block", ".hidden-xs", ".sm-hidden"], correctAnswer: 1 },
    ],
    advanced: [
      { question: "What is Bootstrap's Sass variable for primary color?", options: ["$primary", "$color-primary", "$bootstrap-primary", "$main-color"], correctAnswer: 0 },
      { question: "How do you customize Bootstrap with Sass?", options: ["Edit CDN", "Override variables before importing Bootstrap", "Edit node_modules", "Use !important"], correctAnswer: 1 },
      { question: "What is Bootstrap's JS dependency in v5?", options: ["jQuery", "No dependency - vanilla JS", "React", "Angular"], correctAnswer: 1 },
      { question: "What does the 'collapse' component do?", options: ["Crashes the page", "Toggles visibility of content", "Removes elements", "Minimizes window"], correctAnswer: 1 },
      { question: "What is Bootstrap's offcanvas component?", options: ["Off-screen drawing", "Hidden sidebar revealed on trigger", "Canvas element wrapper", "An animation"], correctAnswer: 1 },
    ],
  },
};

const getQuestions = (tech, level) => {
  if (!tech || !level) return [];
  return questionsData[tech]?.[level] || [];
};

const Sidebar = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const submittedRef = useRef(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const technologies = [
    { id: "html", name: "HTML", color: "bg-orange-100 text-orange-600" },
    { id: "css", name: "CSS", color: "bg-blue-100 text-blue-600" },
    { id: "js", name: "JavaScript", color: "bg-yellow-100 text-yellow-600" },
    { id: "react", name: "React", color: "bg-cyan-100 text-cyan-600" },
    { id: "node", name: "Node.js", color: "bg-green-100 text-green-600" },
    { id: "mongodb", name: "MongoDB", color: "bg-emerald-100 text-emerald-600" },
    { id: "java", name: "Java", color: "bg-red-100 text-red-600" },
    { id: "python", name: "Python", color: "bg-indigo-100 text-indigo-600" },
    { id: "cpp", name: "C++", color: "bg-purple-100 text-purple-600" },
    { id: "bootstrap", name: "Bootstrap", color: "bg-pink-100 text-pink-600" },
  ];

  const levels = [
    { id: "basic", name: "Basic" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  const questions = useMemo(() => getQuestions(selectedTech, selectedLevel), [selectedTech, selectedLevel]);
  const currentQ = questions[currentQuestion];

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswer) correct++;
    });
    return {
      correct,
      total: questions.length,
      percentage: questions.length ? Math.round((correct / questions.length) * 100) : 0,
    };
  };

  const score = calculateScore();

  const handleTechSelect = (techId) => {
    setSelectedTech(techId === selectedTech ? null : techId);
    setSelectedLevel(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
  };

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
  };

  const handleAnswerSelect = (index) => {
    if (userAnswers[currentQuestion] !== undefined) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: index }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
  };

  const submitResult = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const s = calculateScore();
    const payload = {
      title: `${selectedTech.toUpperCase()} - ${selectedLevel} quiz`,
      technology: selectedTech,
      level: selectedLevel,
      totalQuestions: s.total,
      correct: s.correct,
      wrong: s.total - s.correct,
    };
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      if (token) {
        await axios.post(`${API_BASE}/api/results`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      submittedRef.current = false;
      console.error("Error saving result:", err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (showResults) submitResult();
  }, [showResults]);

  const getPerformance = () => {
    if (score.percentage >= 90) return { text: "Outstanding!", color: "text-amber-600" };
    if (score.percentage >= 75) return { text: "Excellent!", color: "text-blue-600" };
    if (score.percentage >= 60) return { text: "Good Job!", color: "text-green-600" };
    return { text: "Keep Practicing", color: "text-gray-600" };
  };

  const performance = getPerformance();

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: isSidebarOpen ? "260px" : "0",
        minWidth: isSidebarOpen ? "260px" : "0",
        overflow: "hidden",
        background: "#1e1b4b",
        color: "white",
        transition: "width 0.3s",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #3730a3" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>Tech Quiz Master</h2>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#a5b4fc" }}>Select a technology</p>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "12px" }}>
          {technologies.map((tech) => (
            <button
              key={tech.id}
              onClick={() => handleTechSelect(tech.id)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 14px",
                marginBottom: "6px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "14px",
                fontWeight: selectedTech === tech.id ? "bold" : "normal",
                background: selectedTech === tech.id ? "#4338ca" : "#312e81",
                color: "white",
                transition: "background 0.2s",
              }}
            >
              {tech.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, background: "#f8fafc", display: "flex", flexDirection: "column" }}>
        {/* Mobile header */}
        <div style={{ background: "#1e1b4b", color: "white", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setIsSidebarOpen((p) => !p)}
            style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "4px" }}
          >
            <Menu size={20} />
          </button>
          <span style={{ fontWeight: "bold" }}>
            {selectedTech ? technologies.find((t) => t.id === selectedTech)?.name : "Tech Quiz Master"}
          </span>
        </div>

        <div style={{ flex: 1, padding: "24px", maxWidth: "700px", margin: "0 auto", width: "100%" }}>

          {/* Welcome screen */}
          {!selectedTech && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <Award size={64} style={{ color: "#4338ca", margin: "0 auto 16px" }} />
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e1b4b" }}>Welcome to Tech Quiz Master</h2>
              <p style={{ color: "#64748b", marginTop: "8px" }}>Select a technology from the sidebar to start your quiz journey.</p>
            </div>
          )}

          {/* Level selection */}
          {selectedTech && !selectedLevel && !showResults && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#1e1b4b" }}>
                {technologies.find((t) => t.id === selectedTech)?.name} Quiz
              </h2>
              <p style={{ color: "#64748b", margin: "8px 0 24px" }}>Select a difficulty level to begin</p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                {levels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleLevelSelect(l.id)}
                    style={{
                      padding: "16px 32px",
                      borderRadius: "12px",
                      border: "2px solid #4338ca",
                      background: "white",
                      color: "#4338ca",
                      fontSize: "16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.target.style.background = "#4338ca"; e.target.style.color = "white"; }}
                    onMouseLeave={(e) => { e.target.style.background = "white"; e.target.style.color = "#4338ca"; }}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quiz questions */}
          {selectedTech && selectedLevel && !showResults && currentQ && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: "#64748b" }}>
                  <span>{technologies.find((t) => t.id === selectedTech)?.name} - {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</span>
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                </div>
                <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "3px" }}>
                  <div style={{ height: "100%", background: "#4338ca", borderRadius: "3px", width: `${((currentQuestion + 1) / questions.length) * 100}%`, transition: "width 0.3s" }} />
                </div>
              </div>

              <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b", marginBottom: "20px" }}>{currentQ.question}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {currentQ.options.map((option, index) => {
                    const isSelected = userAnswers[currentQuestion] === index;
                    const isCorrect = index === currentQ.correctAnswer;
                    const showFeedback = userAnswers[currentQuestion] !== undefined;
                    let bgColor = "white";
                    let borderColor = "#e2e8f0";
                    if (showFeedback) {
                      if (isSelected && isCorrect) { bgColor = "#dcfce7"; borderColor = "#22c55e"; }
                      else if (isSelected && !isCorrect) { bgColor = "#fee2e2"; borderColor = "#ef4444"; }
                      else if (!isSelected && isCorrect) { bgColor = "#dcfce7"; borderColor = "#22c55e"; }
                    }
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "8px",
                          border: `2px solid ${borderColor}`,
                          background: bgColor,
                          textAlign: "left",
                          fontSize: "15px",
                          cursor: showFeedback ? "default" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          transition: "all 0.2s",
                        }}
                      >
                        {showFeedback && isCorrect && <CheckCircle size={18} color="#22c55e" />}
                        {showFeedback && isSelected && !isCorrect && <XCircle size={18} color="#ef4444" />}
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {userAnswers[currentQuestion] !== undefined && (
                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={handleNext}
                    style={{
                      padding: "12px 28px",
                      background: "#4338ca",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "15px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question →" : "See Results →"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results screen */}
          {showResults && (
            <div style={{ textAlign: "center", padding: "40px 20px", background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <Trophy size={56} style={{ color: "#4338ca", margin: "0 auto 16px" }} />
              <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e1b4b" }}>Quiz Completed!</h2>
              <p style={{ fontSize: "18px", fontWeight: "bold", margin: "8px 0 4px" }} className={performance.color}>{performance.text}</p>
              <div style={{ fontSize: "48px", fontWeight: "bold", color: "#4338ca", margin: "16px 0" }}>{score.percentage}%</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "32px", margin: "16px 0 24px" }}>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>{score.correct}</div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>Correct</div>
                </div>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ef4444" }}>{score.total - score.correct}</div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>Incorrect</div>
                </div>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#64748b" }}>{score.total}</div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>Total</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  onClick={handleRestart}
                  style={{ padding: "12px 24px", background: "#4338ca", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "bold", cursor: "pointer" }}
                >
                  Try Again
                </button>
                <button
                  onClick={() => { setSelectedLevel(null); setShowResults(false); }}
                  style={{ padding: "12px 24px", background: "white", color: "#4338ca", border: "2px solid #4338ca", borderRadius: "8px", fontSize: "15px", fontWeight: "bold", cursor: "pointer" }}
                >
                  Change Level
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
