/**
 * Comprehensive sample dataset populated from Tommy Bo's completed Future Authoring
 * walkthrough (from PDF #2) and realistic Past and Present Authoring responses.
 */

export const SAMPLE_DATA = {
  past: {
    epochs: [
      { id: 1, title: "Early Childhood (Ages 0 - 6)", description: "Growing up in a lively household, early memories of curiosity, exploration, and forming my first friendships." },
      { id: 2, title: "Elementary & Middle School (Ages 7 - 13)", description: "Academic discovery, discovering passion for reading and drawing, learning social dynamics." },
      { id: 3, title: "High School Years (Ages 14 - 18)", description: "Developing independence, creative pursuits, overcoming self-doubt, martial arts training." },
      { id: 4, title: "First Year of University (Age 19)", description: "Major transition to university life, seeking purpose, exploring digital media, learning self-discipline." },
      { id: 5, title: "Creative Awakening & Video Projects (Ages 20 - 21)", description: "Starting video production, finding my authentic voice, learning to seek discomfort and take risks." },
      { id: 6, title: "Building Meaningful Relationships (Ages 22 - 23)", description: "Deepening family connections, finding high-caliber friends who value personal growth and honesty." },
      { id: 7, title: "Present Era & Stepping into Responsibility (Current)", description: "Committing fully to my craft, taking charge of my physical and financial health, planning the future." }
    ],
    experiences: [
      {
        id: "exp_1",
        epochId: 1,
        title: "Learning to ride a bicycle without training wheels",
        description: "After falling several times and feeling discouraged, my father encouraged me to try one more time on the grass. I found my balance and felt an exhilarating surge of independence.",
        impact: "This taught me that failure is just an intermediate state before mastery. It gave me early confidence that persistence overcomes initial fear and physical clumsiness."
      },
      {
        id: "exp_2",
        epochId: 3,
        title: "Starting Karate and Martial Arts Training",
        description: "I walked into the dojo feeling insecure about my physical strength. The intense drills and discipline pushed me way beyond my comfort zone.",
        impact: "It transformed my relationship with physical confrontation and fear. I realized discipline builds genuine self-respect that permeates every social interaction."
      },
      {
        id: "exp_3",
        epochId: 5,
        title: "Publishing my first public creative video project",
        description: "I spent weeks filming and editing a deeply personal video. Hitting 'Publish' terrified me because I dreaded negative judgment.",
        impact: "The positive reception and constructive feedback proved to me that authentic expression resonates far more than safe conformity."
      }
    ],
    criticalExperiences: [
      {
        id: "crit_1",
        title: "Starting Karate and Martial Arts Training",
        partA: "I entered training because I felt physically weak and timid in social situations. The events were intensely positive in the long run, though physically grueling. My role was showing up consistently three times a week even when tired. Looking back, I should have started even earlier.",
        partB: "It dramatically increased my confidence and trust in disciplined men. It shifted my personality from passive and agreeable to firm, assertive, and calm under pressure."
      },
      {
        id: "crit_2",
        title: "Publishing my first public creative video project",
        partA: "This came about from wanting to break free of merely consuming content and start creating. My friends encouraged me to push through the imposter syndrome. I took full ownership of the script, filming, and editing.",
        partB: "It solidified my belief in my own creative voice and made me look forward to a career in digital media and storytelling. It made me less vulnerable to harsh criticism."
      }
    ]
  },
  presentVirtues: {
    selectedTraits: {
      extraversion: ["Can take charge and lead", "Make friends easily", "Feel at ease with people", "Am enthusiastic about new opportunities", "Can listen well", "Think before I act"],
      openness: ["Am full of ideas", "Am quick to understand things", "Am a creative person", "Have a vivid imagination", "Am always learning new things", "Spend time reflecting on things", "Am entrepreneurial"],
      conscientiousness: ["Am always prepared", "Do things according to a plan", "Have seen my tendency for hard work pay off", "Am very goal-oriented", "Do what I say I am going to do"],
      emotional_stability: ["Am in control of my emotions", "Am relaxed most of the time", "Calm down quickly when I do get upset", "Am good at identifying the risks in new situations"],
      agreeableness: ["Truly care about others", "Am a very loyal friend", "Will stand up for myself", "Work very well with other people on teams", "Am good at seeing beneath the surface of false good intentions"]
    },
    focusedVirtues: [
      "Will stand up for myself",
      "Am very goal-oriented",
      "Am a creative person",
      "Am always learning new things",
      "Do what I say I am going to do",
      "Am enthusiastic about new opportunities",
      "Am in control of my emotions"
    ],
    virtueRankings: [
      "Will stand up for myself",
      "Do what I say I am going to do",
      "Am very goal-oriented",
      "Am a creative person",
      "Am always learning new things",
      "Am in control of my emotions",
      "Am enthusiastic about new opportunities"
    ],
    analyses: {
      "Will stand up for myself": {
        experience: "In a group project where others wanted to cut corners on the final deliverable, I politely but firmly refused to attach my name to compromised work and presented a clear standard.",
        alternative: "I could have communicated my expectations earlier in the timeline rather than waiting for the deadline crunch, preventing last-minute friction.",
        improvement: "Practice everyday assertiveness in lower-stakes situations so that holding healthy boundaries becomes second nature without any need for tension."
      },
      "Do what I say I am going to do": {
        experience: "Promised my family I would handle the logistics for our gathering and executed every step punctually, building deep trust and reliability.",
        alternative: "Could have budgeted time better so I was not rushing right before the start.",
        improvement: "Keep strict calendar integrity: never overcommit verbally unless I have actively scheduled the required time blocks."
      }
    }
  },
  presentFaults: {
    selectedTraits: {
      extraversion: ["Often feel uncomfortable around others", "Bottle up my feelings", "Wait for others to lead the way", "Have a social circle that is too small"],
      openness: ["Pursue too many activities at the same time", "Am interested in so many things that I don't know what to focus on", "Daydream too much"],
      conscientiousness: ["Often procrastinate", "Surf the web or watch TV or waste time in other ways even if I have a project due", "Make a mess of things"],
      emotional_stability: ["Get stressed out easily", "Am too self-conscious for my own good", "Compare myself unfavorably to other people"],
      agreeableness: ["Avoid conflict even when it is necessary", "Cannot negotiate for myself very well", "Will sacrifice my own feelings for the comfort of others", "Can bottle up my feelings until I become resentful"]
    },
    focusedFaults: [
      "Avoid conflict even when it is necessary",
      "Often procrastinate",
      "Pursue too many activities at the same time",
      "Will sacrifice my own feelings for the comfort of others",
      "Compare myself unfavorably to other people",
      "Bottle up my feelings"
    ],
    faultRankings: [
      "Avoid conflict even when it is necessary",
      "Often procrastinate",
      "Pursue too many activities at the same time",
      "Will sacrifice my own feelings for the comfort of others",
      "Compare myself unfavorably to other people",
      "Bottle up my feelings"
    ],
    analyses: {
      "Avoid conflict even when it is necessary": {
        experience: "I stayed quiet during an unfair team decision because I feared friction, which ended up costing us double the work later and made me resentful.",
        alternative: "I should have spoken up immediately with respectful candor and proposed an alternative solution right when the issue arose.",
        improvement: "Recognize that honest, early conflict is far kinder and more productive than delayed resentment and failure."
      },
      "Often procrastinate": {
        experience: "Delayed editing a major video project by distracting myself with social media, leading to extreme stress the night before delivery.",
        alternative: "Breaking the editing into 45-minute focused blocks over 4 days would have made the process enjoyable and stress-free.",
        improvement: "Adopt a strict morning work ritual where the hardest creative task is worked on first thing before opening social media."
      }
    }
  },
  future: {
    // Stage 1 Preliminary Notes & Thoughts (Directly from Tommy Bo's Walkthrough PDF)
    warmups: {
      "1.1": "One massive thing that I could do better is to be more assertive and confident with my actions and words. I often find that I am not as confident or brave enough to speak with conviction for fear of being judged or criticized due to my opinions or principles.\n\nI am fearful of receiving harsh criticism for speaking up and being assertive. I find that I am a 'nice guy' or a 'people pleaser.' I care too much about what other people think of me then what I think of myself. I want conviction and courage to carry my truth outward and if I'm wrong, I get to learn.",
      "1.2": "I would love to learn more film-making and also more music. Music inspires me and allows to authentically express my emotions and being. It is also therapeutic.\n\nFilm-making helps me express myself through the stories I create and it fires up my imaginative state. I've seen other great filmmakers make successful careers and lives with their passion; they have a mission that is motivating and inspiring. If I improve these things, then it would add tremendous value to my life.",
      "1.3": "For my habits, I want to permanently quit pornography and pursue more meaningful ways of being such as intimate relationships or passionate connection. I don't want to smoke, drink, or have alcohol. As for beer, no beer ever! I want to remain sober and avoid situations where people are tempted to drink unhealthy amounts.\n\nI also want to have an amazing morning ritual which will include gratitude, meditation, exercise, a healthy breakfast. Consecutive habit of reading 25 pages per day. As for my night ritual, reflect on the day and have relaxing sleep.\n\nFor my health, I want a great diet of greens, clean protein, and limited sugar.",
      "1.4": "Man, I want to have the best-est of friends. These friends are similar to the boys at Yes Theory.\n\nMy friend group will consist of amazing, open minded people who are both willing to grow and to seek discomfort. They are wise and smart but also know how to have fun. This group will be close like a family and I want to have dinner and beautiful gatherings with them often. We understand each other and know what we are authentically.",
      "1.5": "My leisure time would consist of piano, hanging out with friends and family, dancing, social gatherings, cooking, and biking or riding around in the neighborhood. I would love to use my free time to improve my cooking skills, piano playing, drawing, painting, film-making, writing, reading, editing, etc. Swimming would be meaningful as well and also I would love to try surfing.",
      "1.6": "My ideal family life will be a family who supports my visions and dreams no matter how big or grand they may seem because they believe and trust in me. My relationship with my mom and dad will be connecting and rewarding; they will know what is going on in their lives and so will I. My partner will be supportive and energetic; we will have a divine connection with our souls and our hearts will be aligned. As for my baby sister, I want to be there for her, show her how a man is supposed to treat her and give her the respect she needs.",
      "1.7": "My school career will be less than a decade long. I want to graduate university without any debt. Also, I want to expand my consciousness and field of expertise on a variety of subjects such as film-making, music, wisdom, self-improvement, and language/history by reading the most magnificent books.\n\nMy work career will be a fulfilling career that pays well and provides for my family's needs. I would love to have at least a $100k income per year; that would be bad ass. Relating to digital media, travel, coaching or entrepreneurship.",
      "1.8": "I admire the boys from Yes Theory, Jordan B. Peterson, Jay Shetty, Prince Ea, Dalai Lama, and Elon Musk because they have legendary abilities and self-awareness to do amazing things with their skills and talents. Jordan B. Peterson can articulate his arguments and truthful conversations well and I respect his competence. Jay Shetty has inner peace. Elon Musk and Dalai Lama both contribute to society in unprecedented ways."
    },
    idealFutureEssay: "My ideal future 5 or even 10 years from now is gonna be awesome.\n\nWho do I want to be? I want to be a man that people can depend on. I want to be the very representation of honor and passion. I love what the guys at Yes Theory do and I want to be like that: men who are willing to seek discomfort to create more opportunities and to make life more exciting. I also want to participate in meaningful work and I want to be the light in my community and in the world.\n\nI want to create meaningful work and share it with people. What do I want to do? I want a fulfilling career that connects me with opportunity. It will give me a chance to grow and to meet new amazing people. This career could be film-making, travel, coaching or anything revolving digital media, entrepreneurship and building businesses.\n\nMy hobbies are going to be mainly in the creative space: dancing, piano, music, surfing, guitar, cooking.\n\nWhere do I want to end up? I want to develop and grow my character, travel the world, visit interesting new places, and interact with beautiful new cultures. It would be amazing if I had my own house with an amazing backyard to bring people together.\n\nWhy do I want these things? Because this is the lifestyle that I want. I desire to be free and live life on my own terms with my own group of friends. I want to grow my YouTube channel to 1.5 million subscribers with fans from all over the world, inspiring people to become the best versions of themselves.\n\nI want to develop self-control and discipline just like Captain America. My partner will be supportive, attractive, and have a caring, compassionate heart who is willing to grow alongside me.\n\nHow and when will I put my plans into action? Through the small daily things: morning rituals (wake up at 5:00, tea, journaling, walk, meditate, breakfast), evening rituals, weekly planning every Sunday, and monthly review.",
    futureToAvoidEssay: "Most people know what hell looks like, and if you don't then you either haven't lived that long, are ignorant, or are blind to the world around you. This is my version of hell.\n\nIn this version, I would be addicted to pornography and watching it at all would be devastating; it creates a distorted view of sexual reality and relationships. I would also be nihilistic and depressed at my purpose in life. Due to this lack of purpose, I would be more prone to be addicted to substances such as alcohol and drugs. To avoid this hell, I must avoid all drugs at all costs and have a meaningful, well-defined purpose in life.\n\nMy relationships would also be bad. I would be lonely and my family would be in shambles. I might also be unproductive, lazy and unhealthy with a life-threatening disease resulting from poor eating and no exercise.\n\nMy only job would be a soul-crushing 9-5 and drowning in financial debt. I would be weak, puny, and defenseless. My position in life would be one of stagnation; everyday boring and sad. Anger and resentment would consume me. I would be undisciplined, bitter, angry, and depressed.\n\nI would hurt other people and maybe end up in jail. My career and YouTube channel would have all died and the future would look hopelessly bleak: homeless, naked in the streets, and unmotivated.\n\nMy values and principles would have faded and there would be no honor or virtue left in my soul. My spirit would have died long before my actual physical death.",
    
    // Stage 2 Specific Goals (from Tommy Bo PDF)
    overallGoalTitle: "The Purposeful Life",
    overallGoalDescription: "The life of courage, honor, truth, and purpose.",
    
    goals: [
      { id: 1, title: "Be more assertive and truthful", description: "Speak up for what you believe in, stand up for yourself, choose choices that are in your own best self interests, speak the truth, don't lie, speak your truths." },
      { id: 2, title: "Create morning/daily habits", description: "Morning rituals, habits throughout the day to keep yourself grounded and in control of your mood and actions. Daily times of self-reflection and silence. Daily practices for competence." },
      { id: 3, title: "Improve Your Family", description: "Put your family in order before you go out there and change the world. Start with the small, but important stuff." },
      { id: 4, title: "Grow Relationships", description: "Improve and grow your relationships with friends, family and intimate partner for long-lasting fulfillment." },
      { id: 5, title: "Be Healthy", description: "Love yourself by feeding yourself right and also exercise. Health is wealth: diet, discipline, and workouts." },
      { id: 6, title: "Seek Discomfort", description: "Face your fears, go through new and beautiful experiences that truly make you feel alive. Confront fear." },
      { id: 7, title: "YouTube = 1 Million Subs", description: "Grow your YouTube channel and make a new project to work on. Develop your skills and contribute to the highest meaning possible." },
      { id: 8, title: "Financial Abundance", description: "Have financial abundance to have freedom and stability in your life + contentedness. Money = Energy." }
    ],

    goalPriorities: [1, 2, 3, 4, 5, 6, 7, 8],

    goalStrategies: {
      1: {
        motives: "I am pursuing this goal for myself because I want to be stronger in my words and in my values. Also, I don't want to be pushed around by other people just because I am not confident or assertive.",
        socialImpact: "If I completed this goal then my life would be more authentic and fulfilling. Fake friends would also disappear and only the real people who actually love would stay. Also, since I have more self-respect for myself, I'll look at people in a more realistic and authentic manner.",
        strategies: "To be more confident and assertive, I will take Karate and develop my skills.\n\n• DAILY: Keep track and feel my way towards not lying and telling the truth. Keep a mental note of the times I was not assertive. Speak my mind and say no assertively.\n• WEEKLY: Plan out my week every Sunday in a quiet area. Review my plans for the month and year.\n• MONTHLY: Track progress and ask myself: 'Am I living a life that is true and authentic to me personally?'",
        obstacles: "• Obstacle: My friends might dislike my new or revealed authentic self.\n→ Solution: Make new friends that support my journey of self-discovery using outlets such as social events or clubs.\n• Obstacle: I might lean towards being a bit aggressive.\n→ Solution: Whenever I sense aggression, adjust attitude to become firm yet respectful.",
        benchmarks: "• Monitor by doing a self-analysis at the end of the day by writing down what I accomplished in regards to assertiveness.\n• Take an assertiveness or personality check once a week to track progress."
      },
      2: {
        motives: "I want to have the best start to the day and develop my skills to improve the quality of my life. I must take care of myself spiritually, mentally, emotionally, and physically.",
        socialImpact: "This goal gives my days a solid routine to bounce off and attack the world. It will improve my happiness levels and spread positive energy to others.",
        strategies: "• DAILY: Check off my morning habits (5:00 AM wake up, tea, journal, walk, meditation, breakfast) and evening rituals on my habit app.\n• WEEKLY: Review habit scores and streaks on Sunday.\n• MONTHLY: Undertake a new monthly challenge that adds or subtracts a habit.",
        obstacles: "• Obstacle: Laziness and lethargic moods in the morning.\n→ Solution: Counter this by reminding myself of the heroic quest I have embarked upon; wake up to win the first victory of the day.",
        benchmarks: "• Review habit streaks and scores weekly in my journal.\n• Measure consistency and energy levels throughout the week."
      },
      3: {
        motives: "I am doing this for myself and for my family because I don't want to see them suffering. Life is much better if my family is in order. Start small baby.",
        socialImpact: "If my family improved, I can stop worrying about their well-being and gain full support to make my dreams reality. This harmony radiates to cousins, uncles, and aunts.",
        strategies: "• DAILY: Listen and address family concerns, clean up dishes, help watch sister so Grandma gets a break, communicate openly.\n• WEEKLY: Weekly family reflection in my journal.\n• MONTHLY: Plan a fun family outing or trip somewhere new.",
        obstacles: "• Obstacle: Family might criticize things I do wrong.\n→ Solution: Put ego aside, take truthful advice into account, and apply it to become a better person.",
        benchmarks: "• Journal about family victories and problem resolutions.\n• Notice the atmosphere: when family is more positive, inspired, and communicative."
      },
      4: {
        motives: "I want to develop long-lasting, trustworthy, and authentic relationships with people I love and care for the most. Highs and lows shared together.",
        socialImpact: "Life has so much more depth and abundance. I can see diverse backgrounds of people and have mutual reliability. People are destinations and serendipity leads the way.",
        strategies: "• DAILY: Spend quality time with loved ones, keep tabs open with friends.\n• WEEKLY: Call an old friend or family member to reconnect and ask how they are doing.\n• MONTHLY: Go on an exciting adventure with friends or family.",
        obstacles: "• Obstacle: Trouble creating new connections or communicating plans.\n→ Solution: Engage in more social situations spontaneously, reach out consistently.",
        benchmarks: "• Call someone I haven't talked to in a long time every week.\n• Feeling deeper compassion, love, and joy in daily interactions."
      },
      5: {
        motives: "Health is wealth: diet, discipline, and workouts. I can't build my dream life without caring for this physical vehicle I've been given.",
        socialImpact: "Gives me the vitality to be productive and inspiring. Inspires friends and family to make healthy lifestyle choices as well.",
        strategies: "• DAILY: Drink plenty of water, record daily meals, workout every morning, avoid trigger junk foods.\n• WEEKLY: Prepare meal plan on weekends, record body weight, learn one new healthy recipe.\n• MONTHLY: Adopt a clean nutrition focus and grocery audit.",
        obstacles: "• Obstacle: Tempted by fast food, soft drinks, or sugar.\n→ Solution: Clear the pantry, keep healthy filling food available, never shop while starving.\n• Obstacle: Lack of recipe ideas.\n→ Solution: Use cooking apps and weekly recipe research.",
        benchmarks: "• Track morning workout consistency and weight weekly.\n• Elevated daily energy and clarity."
      },
      6: {
        motives: "In order to do things I've never done, I have to do things I've never done before. Like Yes Theory, seeking discomfort brings opportunity and vitality.",
        socialImpact: "Develops special resilience to rejection and social pressure. Makes life dynamic and special, expanding my horizons and inspiring peers.",
        strategies: "• DAILY: Track one small uncomfortable or courageous action each day.\n• WEEKLY: Undertake a weekly challenge that pushes my comfort zone.\n• MONTHLY: Organize a major seek-discomfort adventure or event.",
        obstacles: "• Obstacle: Natural inertia, hesitation or laziness.\n→ Solution: Cultivate the discipline to lean directly into discomfort; remember seeking discomfort = freedom.",
        benchmarks: "• Journal entry for every uncomfortable thing faced and conquered."
      },
      7: {
        motives: "Life is not slavery. I want to build my own dream, progress humanity, and create meaningful storytelling that reaches millions.",
        socialImpact: "Empower audience to seek discomfort and live boldly. Inspire family and provide creative employment for close friends.",
        strategies: "• DAILY: Brainstorm and write video concepts, film content according to schedule.\n• WEEKLY: Plan video calendar for next week, maintain 3-week buffer of finished videos.\n• MONTHLY: Review analytics (watch time, reach) while keeping self-worth independent of metrics.",
        obstacles: "• Obstacle: Procrastination and lack of inspiration.\n→ Solution: Keep a rich video ideas bank, use Google Calendar deadlines, seek discomfort when feeling stuck.",
        benchmarks: "• Reach milestone subscriber targets (1k, 10k, 100k, 1M) with weekly scheduled uploads."
      },
      8: {
        motives: "Financial abundance provides freedom and stability to pursue what purpose calls for. Money = Energy.",
        socialImpact: "Enables funding companies, helping family, traveling the world, and supporting meaningful causes without financial anxiety.",
        strategies: "• DAILY: Record expenses and income daily; stay conscious of spending habits.\n• WEEKLY: Learn more about business and wealth creation; review weekly cash flow.\n• MONTHLY: Build and review monthly family budget; allocate funds toward investments.",
        obstacles: "• Obstacle: Careless spending or impulsive purchases.\n→ Solution: Strict budget tracking and automated savings allocation.",
        benchmarks: "• Monthly net worth and savings growth tracked against annual financial goals."
      }
    }
  }
};
