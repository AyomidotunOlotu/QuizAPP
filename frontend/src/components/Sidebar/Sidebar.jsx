import React, { useState, useEffect, useRef } from "react";
import { Globe, Layout, Code, Cpu, Database, Coffee, Terminal, Star, Zap, Target, Menu, CheckCircle, XCircle, Award, BookOpen, Trophy, Sparkles } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import sidebarStyles from "./Sidebar.module.css";
const API_BASE = "https://quizapp-fhss.onrender.com";
const getQuestions = (tech, level) => {
  if (!tech || !level) return [];
  const templates = {
    basic: [
      {
        question: `What is ${tech.toUpperCase()} typically used for?`,
        options: [
          "Building structure",
          "Adding logic and behavior",
          "Creating styles and layout",
          "Managing backend services",
        ],
        correctAnswer: 0,
      },
      {
        question: `Which statement best describes ${tech.toUpperCase()}?`,
        options: [
          "A frontend markup or UI tool",
          "A backend database",
          "A styling language",
          "A server runtime",
        ],
        correctAnswer: 0,
      },
      {
        question: `A beginner should start learning ${tech.toUpperCase()} to understand:`,
        options: [
          "How web content is structured",
          "How servers process data",
          "How to style components",
          "How to design APIs",
        ],
        correctAnswer: 0,
      },
      {
        question: `${tech.toUpperCase()} is most closely associated with:`,
        options: [
          "HTML tags and page structure",
          "CSS selectors and styling",
          "JavaScript logic",
          "Server-side processing",
        ],
        correctAnswer: 0,
      },
      {
        question: `Which of the following is a common ${tech.toUpperCase()} concept?`,
        options: [
          "Elements and attributes",
          "Components and hooks",
          "Queries and schemas",
          "Threads and concurrency",
        ],
        correctAnswer: 0,
      },
    ],
    intermediate: [
      {
        question: `Which feature is important for ${tech.toUpperCase()} development at the intermediate level?`,
        options: [
          "Understanding semantic structure",
          "Creating dynamic UI interactions",
          "Writing clean CSS",
          "Working with databases",
        ],
        correctAnswer: 0,
      },
      {
        question: `How does ${tech.toUpperCase()} fit into the web development workflow?`,
        options: [
          "It defines the structure of content",
          "It styles the user interface",
          "It runs server-side logic",
          "It manages data persistence",
        ],
        correctAnswer: 0,
      },
      {
        question: `An intermediate ${tech.toUpperCase()} quiz question might cover:`,
        options: [
          "Form elements and validity",
          "JavaScript event handling",
          "Responsive styling",
          "API integration",
        ],
        correctAnswer: 0,
      },
      {
        question: `Which is a typical ${tech.toUpperCase()} task?`,
        options: [
          "Creating accessible page sections",
          "Setting up CSS modules",
          "Building stateful components",
          "Writing SQL queries",
        ],
        correctAnswer: 0,
      },
      {
        question: `What does a developer use ${tech.toUpperCase()} for?`,
        options: [
          "To structure web pages and content",
          "To style visual layouts",
          "To build interactive applications",
          "To connect to databases",
        ],
        correctAnswer: 0,
      },
    ],
    advanced: [
      {
        question: `Advanced ${tech.toUpperCase()} knowledge includes:`,
        options: [
          "Complex document structure",
          "Advanced styling techniques",
          "Optimized JavaScript logic",
          "Backend API design",
        ],
        correctAnswer: 0,
      },
      {
        question: `What makes ${tech.toUpperCase()} advanced topics more challenging?`,
        options: [
          "Handling nested elements and accessibility",
          "Managing responsive layouts",
          "Building reusable components",
          "Scaling databases",
        ],
        correctAnswer: 0,
      },
      {
        question: `A senior ${tech.toUpperCase()} developer should understand:`,
        options: [
          "How browsers interpret markup",
          "How CSS specificity works",
          "How JavaScript closures operate",
          "How to configure servers",
        ],
        correctAnswer: 0,
      },
      {
        question: `Which advanced ${tech.toUpperCase()} concept can improve page structure?`,
        options: [
          "Using semantic HTML responsibly",
          "Writing CSS variables",
          "Organizing React state",
          "Designing backend schemas",
        ],
        correctAnswer: 0,
      },
      {
        question: `What is a strong indicator of advanced ${tech.toUpperCase()} skill?`,
        options: [
          "Creating structured and accessible layouts",
          "Implementing complex styling systems",
          "Composing scalable UI logic",
          "Optimizing database queries",
        ],
        correctAnswer: 0,
      },
    ],
  };
  return templates[level] || [];
};
const Sidebar = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState([]);

  const submittedRef = useRef(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const asideRef = useRef(null);

  useEffect(() => {
    if (selectedTech && selectedLevel) {
      setQuestions(getQuestions(selectedTech, selectedLevel));
      setCurrentQuestion(0);
      setUserAnswers({});
      setShowResults(false);
      submittedRef.current = false;
    } else {
      setQuestions([]);
    }
  }, [selectedTech, selectedLevel]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      if (isSidebarOpen) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const technologies = [
    {
      id: "html",
      name: "HTML",
      icon: <Globe size={20} />,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
    {
      id: "css",
      name: "CSS",
      icon: <Layout size={20} />,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      id: "js",
      name: "JavaScript",
      icon: <Code size={20} />,
      color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
    {
      id: "react",
      name: "React",
      icon: <Cpu size={20} />,
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
    {
      id: "node",
      name: "Node.js",
      icon: <Code size={20} />,
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      icon: <Database size={20} />,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      id: "java",
      name: "Java",
      icon: <Coffee size={20} />,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      id: "python",
      name: "Python",
      icon: <Terminal size={20} />,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      id: "cpp",
      name: "C++",
      icon: <Code size={20} />,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      id: "bootstrap",
      name: "Bootstrap",
      icon: <Layout size={20} />,
      color: "bg-pink-50 text-pink-600 border-pink-200",
    },
  ];

  const levels = [
    {
      id: "basic",
      name: "Basic",
      questions: 20,
      icon: <Star size={16} />,
      color: "bg-green-50 text-green-600",
    },
    {
      id: "intermediate",
      name: "Intermediate",
      questions: 40,
      icon: <Zap size={16} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "advanced",
      name: "Advanced",
      questions: 60,
      icon: <Target size={16} />,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const handleTechSelect = (techId) => {
    if (selectedTech === techId) {
      setSelectedTech(null);
      setSelectedLevel(null);
    } else {
      setSelectedTech(techId);
      setSelectedLevel(null);
    }
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;

    if (window.innerWidth < 768) setIsSidebarOpen(true);

    setTimeout(() => {
      const el = asideRef.current?.querySelector(`[data-tech="${techId}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    submittedRef.current = false;
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (userAnswers[currentQuestion] !== undefined || !questions.length) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: answerIndex }));

    if (currentQuestion >= questions.length - 1) {
      setTimeout(() => setShowResults(true), 800);
      return;
    }

    setTimeout(() => {
      setCurrentQuestion((prev) => prev + 1);
    }, 800);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: questions.length
        ? Math.round((correct / questions.length) * 100)
        : 0,
    };
  };

  const currentQ = questions[currentQuestion];
  const score = calculateScore();

  const getPerformanceStatus = () => {
    if (score.percentage >= 90)
      return {
        text: "Outstanding!",
        color: "bg-gradient-to-r from-amber-200 to-amber-300",
        icon: <Sparkles className="text-amber-800" />,
      };
    if (score.percentage >= 75)
      return {
        text: "Excellent!",
        color: "bg-gradient-to-r from-blue-200 to-indigo-200",
        icon: <Trophy className="text-blue-800" />,
      };
    if (score.percentage >= 60)
      return {
        text: "Good Job!",
        color: "bg-gradient-to-r from-green-200 to-teal-200",
        icon: <Award className="text-green-800" />,
      };
    return {
      text: "Keep Practicing",
      color: "bg-gradient-to-r from-gray-200 to-gray-300",
      icon: <BookOpen className="text-gray-800" />,
    };
  };

  const performance = getPerformanceStatus();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);


const submitResult = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const payload = {
      title: `${selectedTech.toUpperCase()} - ${selectedLevel} quiz`,
      technology: selectedTech,
      level: selectedLevel,
      totalQuestions: score.total,
      correct: score.correct,
      wrong: score.total - score.correct,
    };
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      await axios.post(`${API_BASE}/api/results`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      submittedRef.current = false;
      console.error("Error saving result:", err?.response?.data || err.message);
      toast.error("Could not save result.");
    }
  };
  useEffect(() => {
    if (showResults) {
      submitResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults]);

    

return (
    <div>
{/* QUESTION AND ANSWER ALSO RESULT */}
        <main className={sidebarStyles.mainContent}>
          <div className={sidebarStyles.mobileHeader}>
            <button
              onClick={toggleSidebar}
              className={sidebarStyles.menuButton}
            >
              <Menu size={20} />
            </button>

            <div className={sidebarStyles.mobileTitle}>
              {selectedTech ? (
                <div className={sidebarStyles.mobileTechInfo}>
                  <div
                    className={`${sidebarStyles.mobileTechIcon} ${
                      technologies.find((t) => t.id === selectedTech).color
                    }`}
                  >
                    {technologies.find((t) => t.id === selectedTech).icon}
                  </div>
                  <div className={sidebarStyles.mobileTechText}>
                    <div className={sidebarStyles.mobileTechName}>
                      {technologies.find((t) => t.id === selectedTech).name}
                    </div>
                    <div className={sidebarStyles.mobileTechLevel}>
                      {selectedLevel
                        ? `${
                            selectedLevel.charAt(0).toUpperCase() +
                            selectedLevel.slice(1)
                          } level`
                        : "Select level"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={sidebarStyles.mobilePlaceholder}>
                  Select a technology from the menu
                </div>
              )}
            </div>
          </div>

          {selectedTech && !selectedLevel && (
            <div className={sidebarStyles.mobileLevels}>
              <div className={sidebarStyles.mobileLevelsContainer}>
                {levels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleLevelSelect(l.id)}
                    className={sidebarStyles.mobileLevelButton}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!selectedTech ? (
            <div className={sidebarStyles.welcomeContainer}>
              <div className={sidebarStyles.welcomeContent}>
                <div className={sidebarStyles.welcomeIcon}>
                  <Award size={64} className="text-indigo-700" />
                </div>
                <h2 className={sidebarStyles.welcomeTitle}>
                  Welcome to Tech Quiz Master
                </h2>
                <p className={sidebarStyles.welcomeDescription}>
                  Select a technology from the sidebar to start your quiz
                  journey. Test your knowledge at basic, intermediate, or
                  advanced levels.
                </p>

                <div className={sidebarStyles.featuresGrid}>
                  <div className={sidebarStyles.featureCard}>
                    <div className={sidebarStyles.featureIcon}>
                      <Star size={20} />
                    </div>
                    <h3 className={sidebarStyles.featureTitle}>
                      Multiple Technologies
                    </h3>
                    <p className={sidebarStyles.featureDescription}>
                      HTML, CSS, JavaScript, React, and more
                    </p>
                  </div>

                  <div className={sidebarStyles.featureCard}>
                    <div className={sidebarStyles.featureIcon}>
                      <Zap size={20} />
                    </div>
                    <h3 className={sidebarStyles.featureTitle}>
                      Three Difficulty Levels
                    </h3>
                    <p className={sidebarStyles.featureDescription}>
                      Basic, Intermediate, and Advanced challenges
                    </p>
                  </div>

                  <div className={sidebarStyles.featureCard}>
                    <div className={sidebarStyles.featureIcon}>
                      <Target size={20} />
                    </div>
                    <h3 className={sidebarStyles.featureTitle}>
                      Instant Feedback
                    </h3>
                    <p className={sidebarStyles.featureDescription}>
                      Get detailed results and performance analysis
                    </p>
                  </div>
                </div>

                <div className={sidebarStyles.welcomePrompt}>
                  <p className={sidebarStyles.welcomePromptText}>
                    <Sparkles size={16} className="mr-2" />
                    Select any technology to begin your learning adventure!
                  </p>
                </div>
              </div>
            </div>
          ) : !selectedLevel ? (
            <div className={sidebarStyles.levelSelectionContainer}>
              <div className={sidebarStyles.levelSelectionContent}>
                <div
                  className={`${sidebarStyles.techSelectionIcon} ${
                    technologies.find((t) => t.id === selectedTech).color
                  }`}
                >
                  {technologies.find((t) => t.id === selectedTech).icon}
                </div>
                <h2 className={sidebarStyles.techSelectionTitle}>
                  {technologies.find((t) => t.id === selectedTech).name} Quiz
                </h2>
                <p className={sidebarStyles.techSelectionDescription}>
                  Select a difficulty level to begin your challenge
                </p>

                <div className={sidebarStyles.techSelectionPrompt}>
                  <p className={sidebarStyles.techSelectionPromptText}>
                    Get ready to test your{" "}
                    {technologies.find((t) => t.id === selectedTech).name}{" "}
                    knowledge!
                  </p>
                </div>
              </div>
            </div>
          ) : showResults ? (
            <div className={sidebarStyles.resultsContainer}>
              <div className={sidebarStyles.resultsContent}>
                <div className={sidebarStyles.resultsHeader}>
                  <div
                    className={`${sidebarStyles.performanceIcon} ${performance.color}`}
                  >
                    {performance.icon}
                  </div>
                  <h2 className={sidebarStyles.resultsTitle}>
                    Quiz Completed!
                  </h2>
                  <p className={sidebarStyles.resultsSubtitle}>
                    You've completed the {selectedLevel} level
                  </p>
                  <div
                    className={`${sidebarStyles.performanceBadge} ${performance.color}`}
                  >
                    {performance.text}
                  </div>

                  <div className={sidebarStyles.scoreGrid}>
                    <div className={sidebarStyles.scoreCard}>
                      <div className={sidebarStyles.scoreIcon}>
                        <CheckCircle size={24} />
                      </div>
                      <p className={sidebarStyles.scoreNumber}>
                        {score.correct}
                      </p>
                      <p className={sidebarStyles.scoreLabel}>
                        Correct Answers
                      </p>
                    </div>

                    <div className={sidebarStyles.scoreCard}>
                      <div className={sidebarStyles.scoreIcon}>
                        <XCircle size={24} />
                      </div>
                      <p className={sidebarStyles.scoreNumber}>
                        {score.total - score.correct}
                      </p>
                      <p className={sidebarStyles.scoreLabel}>
                        Incorrect Answers
                      </p>
                    </div>
                  </div>

                  <div className={sidebarStyles.scoreProgress}>
                    <div className={sidebarStyles.scoreProgressHeader}>
                      <span className={sidebarStyles.scoreProgressTitle}>
                        Overall Score
                      </span>
                      <span className={sidebarStyles.scoreProgressPercentage}>
                        {score.percentage}%
                      </span>
                    </div>
                    <div className={sidebarStyles.scoreProgressBar}>
                      <div
                        className={`${sidebarStyles.scoreProgressFill} ${
                          score.percentage >= 80
                            ? "bg-green-400"
                            : score.percentage >= 60
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}
                        style={{ width: `${score.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : currentQ ? (
            <div className={sidebarStyles.quizContainer}>
              <div className={sidebarStyles.quizHeader}>
                <div className={sidebarStyles.quizTitleContainer}>
                  <h1 className={sidebarStyles.quizTitle}>
                    {technologies.find((t) => t.id === selectedTech).name} -{" "}
                    {selectedLevel.charAt(0).toUpperCase() +
                      selectedLevel.slice(1)}{" "}
                    Level
                  </h1>
                  <span className={sidebarStyles.quizCounter}>
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>

                <div className={sidebarStyles.progressBar}>
                  <div
                    className={sidebarStyles.progressFill}
                    style={{
                      width: `${
                        ((currentQuestion + 1) / (questions.length || 1)) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className={sidebarStyles.questionContainer}>
                <div className={sidebarStyles.questionHeader}>
                  <div className={sidebarStyles.questionIcon}>
                    <Target size={20} />
                  </div>
                  <h2 className={sidebarStyles.questionText}>
                    {currentQ.question}
                  </h2>
                </div>

                <div className={sidebarStyles.optionsContainer}>
                  {currentQ.options.map((option, index) => {
                    const isSelected = userAnswers[currentQuestion] === index;
                    const isCorrect = index === currentQ.correctAnswer;
                    const showFeedback =
                      userAnswers[currentQuestion] !== undefined;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={userAnswers[currentQuestion] !== undefined}
                        className={`${sidebarStyles.optionButton} ${
                          isSelected
                            ? isCorrect
                              ? sidebarStyles.optionCorrect
                              : sidebarStyles.optionIncorrect
                            : showFeedback && isCorrect
                            ? sidebarStyles.optionCorrect
                            : sidebarStyles.optionNormal
                        }`}
                      >
                        <div className={sidebarStyles.optionContent}>
                          {showFeedback ? (
                            isSelected ? (
                              isCorrect ? (
                                <CheckCircle
                                  size={20}
                                  className={sidebarStyles.optionIconCorrect}
                                />
                              ) : (
                                <XCircle
                                  size={20}
                                  className={sidebarStyles.optionIconIncorrect}
                                />
                              )
                            ) : isCorrect ? (
                              <CheckCircle
                                size={20}
                                className={sidebarStyles.optionIconCorrect}
                              />
                            ) : (
                              <div className={sidebarStyles.optionIconEmpty} />
                            )
                          ) : (
                            <div className={sidebarStyles.optionIconEmpty} />
                          )}
                          <span className={sidebarStyles.optionText}>
                            {option}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className={sidebarStyles.loadingContainer}>
              <div className={sidebarStyles.loadingContent}>
                <div className={sidebarStyles.loadingSpinner} />
                <h3 className={sidebarStyles.loadingTitle}>
                  Preparing Your Quiz
                </h3>
                <p className={sidebarStyles.loadingDescription}>
                  Loading questions...
                </p>
              </div>
            </div>
          )}
        </main>
        <style>{sidebarStyles.customStyles}</style>
    </div>
  );
};

export default Sidebar;
