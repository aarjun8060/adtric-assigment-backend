import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "../src/db/index.js";
import { NewsEvent } from "../src/models/newsEvent.model.js";

/**
 * IMAGES
 * ------
 * Photos are inside the newsletter PDFs but only as flattened full-page
 * images, so they must be cropped out once and uploaded (Cloudinary/S3/public
 * folder). Paste the final URL for each story below. Any empty slot falls
 * back to one of the three original images so nothing renders broken.
 */
const FALLBACK = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuACng_5vWjo2VirfQG4VPr_jdUKkkdTvuKeSGr-FIPNjoodV7VTgv894EM1mMk1_naLwAjtrM7uwag6VsLtKR2UTkWVt5UCttfBsVTHfCVrFtDi5NBt6TaUc5BHY5vKrFQVwme7FoAxMzeD7zI9us-HQBKrOxxpMctp8uu5QD4oeXC-q6nbtcCaWKeqnbuHKupj06JMusehJUWdrtkbu_2G6jKWakWyg0nQv1HCjrqfVba0cINY84TM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBtQ4A1-s8gFK3SIQyA6DA4Nffoiu9iP1jpQAWtUV-mC9zQO67REoGvBfULUWeOGEc7-qlUFPgsekjpaUT_YrB_eHyEW1miMayzJ5OEL2hjezV5rl18y6uQQlhmTyt0QAsJ4YBODLk69ZlXv2fmnrBP6VDGF3XKunXM6dhlSfHhQSSczIsl_mgs3sCLif6Cnq7AzD87Ujvk6iay9HoEhRhVcXuw1wiKM3ZzyVpnPOIYOwqwbH4_Yvbp",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDS00KhqxK7sxObSflMlsXoMAjhpGS1Wf-fmYOClP4Y5YSXCcg7bXMm17ZW9sC7HK1d0jIA1zVrN3uyG6ueqNgb52Pme3oSFO4-Bg5OEGBbZRnStGSm1C_Sz3rPa3QM9Hy9eo-y5raykQCxjJdZZEy7DPBZXby1i48M3Qjhy-G53em7syGB_WaYRs8gCEF19n6m9u0tm9uAAwrl27SejI8lypWCoASjggewxVo3btstostawNhFZjI0",
];

const IMG = {
  peaceMeet: "https://d3bat55ebwjhsf.cloudfront.net/schools/2024-12-24_11-44-37/2800/infra/images/ampi.jpg",        // Peace Education Meet stage / dance drama (July newsletter p.3)
  class10Toppers: "https://www.themanthanschool.co.in/media/gallery/1580536273IMG-20200130-WA0032_1.jpg",   // Grade 10 toppers collage (p.29-30)
  class12Toppers: "https://www.themanthanschool.co.in/newsfeed/wp-content/uploads/2026/08/JapaneseStudentExchange.jpg",   // Grade 12 toppers collage (p.31)
  orientation: "https://www.themanthanschool.co.in/images/ttp3.jpg",      // Orientation Day / Principal at ET summit (p.2, p.4)
  baglessDay: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6GAZbpSphxZ32qZpuYkwimn8f0nk6nBcyCMeGceKWEw&s",       // Bagless Day / tie-dye / Skill Mela (p.4, p.15, p.21)
  earlyYears: "https://www.themanthanschool.co.in/photo-gallery.php",       // Early Years workshops, ISKCON visit, Mother's Day (p.7-8)
  teachers: "https://www.themanthanschool.co.in/teacher-training.php",         // Teachers' workshops / award ceremony (p.16-17, Final p.11)
  sports: "https://content.jdmagicbox.com/v2/comp/delhi/f3/011pxx11.xx11.141212123048.f5f3/catalogue/the-manthan-school-noida-sector-78-noida-kindergartens-j1znpt97x6.jpg",           // Sports competitions and medal winners (p.24-28)
  scienceVisits: "https://www.themanthanschool.co.in/sciencelab.php",    // IIT Delhi / NPL / Prismatic (p.22-23)
  grade5: "https://www.themanthanschool.co.in/classrooms.php",           // Traffic Park / Scouts & Guides / picnic (Final p.4-9)
};


// ================= STORIES =================

// ---------- Story 1: 01-peace-education-meet.js ----------
const s01 = {
  title: "Peace Education Meet 2026: A Journey Towards Harmony",
  slug: "peace-education-meet-2026-journey-towards-harmony",
  category: "Event",
  date: new Date("2026-07-08T09:00:00.000Z"),
  imageKey: "peaceMeet",
  shortDescription:
    "Students composed a Peace Anthem, staged the dance drama 'Becoming Kalki' and spoke with peers from Iran, Japan and South Korea at our Peace Education Meet 2026, organised with HWPL.",
  content: [
    "Peace is easy to talk about and hard to practise. At The Manthan School we believe it is a skill, one that children can learn the way they learn reading or mathematics: slowly, through example, and with a great deal of encouragement. The Peace Education Meet 2026, organised in collaboration with HWPL, was a day built entirely around that belief. It brought together students, teachers, parents and distinguished guests to celebrate what our learners have understood about empathy, harmony and global citizenship, and to show that young people are already doing something about it.",

    "The programme was graced by Chief Guest Lt. Gen. Anil Malik, AVSM, and Guest of Honour Mr. Daniel Kim. Their presence gave the morning a sense of occasion, but it was the students who held the stage. From the first moment, the hall was filled with the quiet attention that only comes when an audience senses that something sincere is about to happen.",

    "A Peace Anthem written and performed by our students",
    "The centrepiece of the opening was a Peace Anthem composed and performed by the students themselves. It is one thing to sing a song handed to you; it is another to sit down together, argue about a word, rewrite a line, and decide what you want the world to hear. The anthem grew out of classroom conversations about what peace actually looks like in a school corridor, in a playground, in a family and in a country. Students spoke about empathy as the ability to imagine another person's day, about harmony as the effort of listening before replying, and about non-violence as a decision that is made again every time a disagreement begins.",
    "Many of the singers had never performed an original piece before. The rehearsal process was a lesson in collaboration: melodies were tried and dropped, verses were reordered, and every voice, confident or hesitant, found a place in the chorus. The result was a performance that the audience received with sustained applause, and the lyrics reflected the children's own words and ideas.",

    "Voices from the classroom: what peace learning looked like",
    "After the anthem, a group of students stepped forward to share their own peace-learning experiences. They spoke plainly and without notes. One theme repeated itself in different words: peace education changed how they handled small, ordinary conflicts. A student described learning to pause before responding to a hurtful remark. Another spoke of inviting a classmate to join a game instead of leaving them on the edge of the playground. A third explained that after discussing a peace story in class, she apologised to a friend she had been avoiding for weeks.",
    "These were not dramatic stories, and that was precisely their strength. Peace education, as our teachers often remind the children, is not a subject for special days. It is practised in the way we queue, share, disagree and forgive. By asking students to describe these moments aloud, the meet helped them recognise their own growth and gave younger children in the audience a model of what reflective, kind behaviour sounds like.",

    "Becoming Kalki: a dance drama of love, unity and compassion",
    "The cultural highlight of the morning was the dance drama 'Becoming Kalki'. Drawing on the idea that a new age begins when people choose goodness over fear, the production followed a journey from conflict toward understanding. Through movement, music and carefully designed costumes, the performers showed how love, unity and compassion can quietly overcome division.",
    "Dance drama asks a great deal of young performers. They must memorise choreography, but also express emotion, stay in character, and move as a single body. Rehearsals ran for several weeks, with teachers and the school's choreographers guiding students through blocking, timing and the discipline of listening to one another's cues. The audience responded warmly, and the final tableau, in which the whole cast stood together in a circle, drew one of the longest rounds of applause of the day.",

    "Eco-friendly Peace Monuments",
    "The meet also showcased the practical impact of the HWPL Peace Curriculum through eco-friendly Peace Monuments created by students. Built from recycled and natural materials, each monument carried a message about peace and a commitment to protecting the planet. Students explained their designs to visitors: a ring of interlocked hands to represent unity, a tree rising from a book to show that knowledge and peace grow together, a globe stitched from reused fabric to symbolise a world mended rather than discarded.",
    "The monuments linked two ideas that our curriculum treats as inseparable. Peace between people and care for the environment both depend on restraint, sharing and long-term thinking. When children work with reused materials and think about the message they want to leave behind, they learn that creativity and responsibility can be one and the same.",

    "Global Peace Dialogues with Iran, Japan and South Korea",
    "One of the most memorable features of the day was the Global Peace Dialogues, in which our students spoke with learners from Iran, Japan and South Korea. For many children it was their first conversation with peers from another country about shared values rather than differences. They asked each other about school life, favourite festivals, what peace means at home, and what young people can do to make their communities kinder.",
    "Teachers observed that the students' initial nervousness quickly gave way to curiosity. Questions were thoughtful and respectful, and answers were received with real interest. The dialogues reinforced a lesson that is difficult to teach from a textbook: people who live far apart often care about the same things. Friendship, family, fairness and safety are not national properties. The exchange also gave students practical experience in listening carefully, speaking clearly and adapting their language so that everyone could follow.",

    "The Awards Ceremony: recognising young peace ambassadors",
    "The celebration concluded with an Awards Ceremony recognising young peace ambassadors and dedicated educators. Students were honoured for consistent kindness, for leadership in peace activities, and for creative contributions to the programme. Teachers who had guided the initiative through the year were also acknowledged for the patience and imagination they brought to it.",
    "In recognising ambassadors, the school was careful to emphasise that peace is not a competition. The awards were presented as a thank-you and as encouragement, a way of telling every child in the audience that kindness noticed is kindness multiplied. Many younger students left the hall saying they wanted to be peace ambassadors next year.",

    "Why peace education matters at this age",
    "Researchers and educators around the world agree that the attitudes children form in the early and middle school years strongly shape how they handle conflict, difference and responsibility later in life. A child who learns to name emotions, listen to another point of view and look for solutions that are fair to everyone is building habits that will serve them in college, at work and as a citizen.",
    "Peace education at The Manthan School therefore runs through the whole year rather than a single event. Classroom discussions, storytelling, art, assembly talks and activities such as the My Peace Pledge Card all reinforce the same message. The Peace Education Meet is the moment when these threads are woven together in public so that families can see them.",
    "It also connects to the wider mission of our school: to develop learners who are academically strong and emotionally intelligent, who can think independently while caring deeply about others. Peace, in this sense, is not an add-on to the curriculum. It is the climate in which good learning happens.",

    "What parents and teachers noticed",
    "The morning was moving and hopeful for the families who attended, and the students' ease in speaking about empathy and non-violence invited every adult in the hall to reflect on their own habits at home. Teachers highlight three changes they hope to see, and are working towards, through the peace programme: students are more likely to resolve disagreements by talking, they are quicker to include classmates who are left out, and they show greater pride in contributing to something larger than themselves.",
    "Teachers also noted that the preparation for the meet was itself a lesson. Students from different grades worked together on the anthem, the drama and the monuments, and older learners took on mentoring roles with younger ones. The result was a school community that felt closer at the end of the project than it did at the beginning.",

    "Looking ahead: small acts, lasting change",
    "The Peace Education Meet is not an endpoint. It is a milestone in a continuing journey. In the coming months students will carry forward the commitments they made on stage, continuing classroom dialogues, community service projects and creative peace activities. Alumni and parents are warmly invited to contribute ideas and volunteer their time.",
    "A simple question was posed to students at the close of the programme: what is one small thing you can do tomorrow to make someone's day better? The answers were modest and sincere: a smile, a shared snack, a kind word, an apology offered without being asked. If each of those small acts is repeated often enough, they become habits, and habits become culture. That is the quiet, patient work of peace, and our students have shown that they are ready to begin it.",

    "A note of gratitude",
    "The school extends its sincere thanks to HWPL for their collaboration, to Lt. Gen. Anil Malik and Mr. Daniel Kim for gracing the event, to the students from Iran, Japan and South Korea who joined the dialogues, to our teachers and choreographers, and above all to our students, whose honesty and creativity made the day what it was. Their anthem, their drama and their monuments were reminders that the future will be shaped by people who have practised kindness long before they were asked to lead.",
    "As we move into the new academic session, The Manthan School remains committed to nurturing global citizens who understand that peace begins with each one of us, in every classroom, every conversation and every choice.",

    "Highlights at a glance",
    "Chief Guest: Lt. Gen. Anil Malik, AVSM. Guest of Honour: Mr. Daniel Kim. Organised in collaboration with HWPL. Programme: Peace Anthem composed and performed by students, student reflections on peace learning, the dance drama 'Becoming Kalki', display of eco-friendly Peace Monuments, Global Peace Dialogues with students from Iran, Japan and South Korea, and an Awards Ceremony for young peace ambassadors and educators.",
    "We encourage every family to continue the conversation at home. Ask your child what peace means to them, what they would put on a Peace Monument, and what they would say to a friend in another country. You may be surprised by how much they have to teach us.",
  ].join("\n\n"),
  published: true,
};

// ---------- Story 2: 02-class10-board-toppers.js ----------
const s02 = {
  title: "CBSE Class 10 Results 2026: Our Board Toppers Shine with Perfect Subject Scores",
  slug: "cbse-class-10-board-toppers-2026",
  category: "Achievement",
  date: new Date("2026-07-12T09:00:00.000Z"),
  imageKey: "class10Toppers",
  shortDescription:
    "Medhavi Sikka leads with 97.6%, followed by Abhinav Gupta and Sakshi Bajeli, while dozens of students scored a perfect 100 in subjects such as Artificial Intelligence, French, IT and Sanskrit.",
  content: [
    "Every year, the declaration of the CBSE Class 10 results is a day of nervous anticipation and, at The Manthan School, a day of celebration. This year's results were among the most gratifying in recent memory. Our students not only secured excellent overall percentages but also earned a remarkable number of perfect scores in individual subjects, particularly in newer skill-based areas such as Artificial Intelligence and Information Technology. The school congratulates every student who appeared for the examination, their parents who stood beside them through long months of preparation, and the teachers whose guidance made the difference.",

    "The top performers of Grade 10",
    "Medhavi Sikka topped the school with 97.6 per cent, an outstanding result that reflects consistent effort across all subjects. Abhinav Gupta followed closely with 97.2 per cent, and Sakshi Bajeli secured 96.8 per cent. Two students, Sparsh Saini and Snigdha Mishra, shared the next position with 96.2 per cent each. These five students form the top tier of a year group whose overall performance was strong across the board.",
    "Behind each number is a story of discipline. Teachers recall that these students were not simply hard workers; they were curious learners who asked questions, revisited concepts they had not fully understood, and supported classmates who were struggling. Several of them also took part in debates, sports and cultural events throughout the year, showing that academic excellence and a well-rounded life can go together.",

    "Subject-wise distinctions",
    "The school is equally proud of the subject-level achievements, which show real depth of learning. Abhishri Mall scored 100 in Sanskrit. Abhinav Gupta scored 100 in French, as did Sparsh Saini. Manvi Singh and Mishika Verma were among those who earned 100 in Information Technology. In Social Science, Aaran Kumar secured 99, and Snigdha Mishra scored 99 in English. In Science, Vedanshi Choudhary and Medhavi Sikka each scored 98, while Aroma Rastogi also scored 98 in Science. Sakshi Bajeli scored 98 in Hindi, and Medhavi Sikka scored 97 in Mathematics. Vanshika Bhatnagar recorded 91 in German.",
    "These results show how wide the range of strengths in the batch is. Language scores in Sanskrit, French, English and Hindi sit alongside strong results in science and mathematics, and the languages offered by the school, including German and French, continue to attract committed students who treat them as serious subjects rather than optional extras.",

    "A perfect score in Artificial Intelligence",
    "One of the most striking features of this year's results is the number of students who scored 100 in Artificial Intelligence. Medhavi Sikka, Sakshi Bajeli, Alpana Nandan, Navya Sharma, Rishav Raj Singh, Aroma Rastogi, Anshika Rao, Menali Sinha, Anika Bhatia, Aaran Kumar, Aratrika Tyagi, Vedansh Mittal, Parvathi Upadhyay, Abhishri Mall and Pragati Sachan all earned the full hundred marks in the subject.",
    "Artificial Intelligence was introduced as a skill subject so that students would have structured exposure to ideas that already shape the modern world: how data is collected, how simple models make predictions, and how to think about the ethical questions that accompany powerful technology. The students' performance shows that they have understood not only the vocabulary but the way of thinking involved: framing a problem, working with data, testing results and questioning conclusions.",
    "Our teachers stress that the real value of these marks lies in the habits behind them. Students learned to approach unfamiliar problems calmly, to explain their reasoning, and to be curious about how things work. Those habits will serve them far beyond the board examination.",

    "How the school prepared its students",
    "Preparation for the Class 10 board examination at The Manthan School is designed to build understanding rather than anxiety. The year is structured so that concepts are taught thoroughly, revised at regular intervals and then applied to practice questions of increasing difficulty. Teachers use periodic assessments to identify gaps early and provide targeted support before they become problems.",
    "Alongside academic preparation, the school places a strong emphasis on well-being. Yoga, counselling support, mindful assembly activities and open conversations with teachers help students manage the pressure that naturally builds in the months before examinations. Parents are kept informed through regular meetings, and are encouraged to focus on routine, rest and encouragement rather than comparison.",
    "Competency-based learning has also shaped classroom practice. Teachers have worked with the latest CBSE academic frameworks and learning outcomes, mapping classroom activities and assessments to specific skills so that students are asked to apply knowledge, not just recall it. This approach is reflected in the strong performance of students in subjects that reward reasoning, such as science, mathematics and social science.",

    "What the toppers say about success",
    "When asked what advice they would offer younger students, the toppers' answers were refreshingly practical. Plan your week and stick to it. Do not leave difficult topics for the last month. Ask your teachers when you do not understand, and do not feel embarrassed about it. Sleep properly. Take short breaks. Revise by solving questions, not just by rereading notes. And above all, remember that marks are a measure of preparation, not of your worth as a person.",
    "Teachers echoed this advice and added a point of their own: the students who performed best were rarely those who studied the longest, but those who studied with focus and consistency. Small daily habits, such as reviewing the day's lessons in the evening and maintaining a neat set of notes, produced larger gains than occasional bursts of intense effort before tests.",

    "The role of parents",
    "Parents play a central part in every board result. They arranged quiet study spaces, adjusted family schedules around examination dates, attended orientation sessions and, most importantly, kept the atmosphere at home calm and supportive. The school thanks every parent for that quiet work. It is not always visible, but it is felt in the confidence with which students walk into the examination hall.",
    "We also take this opportunity to remind families of children who did not reach the scores they hoped for that a result is one moment in a long journey. Many of the most accomplished adults we know did not follow a straight line to their success. Our teachers and counsellors are available to help every student plan the next step, whether that is a stream choice in Grade 11, a skill course, or a new learning goal.",

    "Choosing the right stream",
    "With results in hand, Grade 10 students now face an important decision: the choice of stream for Grades 11 and 12. The school's counselling team organises guidance sessions in which students explore their interests, strengths and long-term aspirations. Students are encouraged to choose subjects they genuinely enjoy and are good at, rather than following trends or peer pressure. Science, Commerce and Humanities each offer rewarding paths, and the school supports students in all three.",
    "Strong results in Artificial Intelligence and Information Technology have, understandably, generated interest in computer science and data-related careers. At the same time, students with distinctions in languages and social science are considering paths in law, journalism, public policy, psychology and international relations. The school's career guidance programme, including the Career Fair held on Bagless Day, helps families see the full range of possibilities.",

    "Celebrating the whole batch",
    "While the toppers deserve their applause, the school wishes to celebrate the entire batch. Every student who completed the examination demonstrated resilience, and many achieved personal bests. Teachers have spoken with pride about students who improved by large margins over the course of the year, who overcame difficulties in specific subjects, or who balanced demanding commitments in sport and the arts with their studies. These stories rarely appear in rank lists, but they are the stories that define a school community.",
    "Our Principal, Ms. Poonam Kumar Mendiratta, and the Headmistresses congratulated the students at a special assembly. They reminded the audience that the school's goal is not to produce rank holders alone, but to produce thoughtful, confident and compassionate young people who will contribute meaningfully to society.",

    "Looking ahead",
    "As these students move into senior school, they carry forward more than marks. They carry a sense of how to work, how to learn and how to support one another. The school will continue to give them opportunities through morning assemblies, leadership roles, competitions, internships and projects. In turn, the younger students who watched this year's toppers receive their certificates now have role models to look to.",
    "Once again, heartfelt congratulations to Medhavi Sikka, Abhinav Gupta, Sakshi Bajeli, Sparsh Saini, Snigdha Mishra and every student of Grade 10. We are proud of you, and we look forward to the next chapter of your journey at The Manthan School.",

    "Study strategies that worked",
    "Teachers who worked closely with the batch identified a handful of practices that distinguished strong performers. First, they treated every class as preparation for the examination: they took clear notes, asked clarifying questions on the spot and reviewed the material the same evening. Second, they used past papers and sample papers as diagnostic tools, noting which types of question cost them marks and returning to those topics until they felt secure. Third, they spread revision across several months instead of compressing it into a few weeks. Finally, they protected their sleep, meals and exercise, understanding that a rested mind recalls and reasons far better than a tired one.",
    "Language subjects offer a good example. Students who scored in the nineties in English, Hindi, French or Sanskrit read regularly, practised writing under timed conditions, and learned grammar through use instead of rote. In Science, the highest scorers drew diagrams from memory, explained experiments aloud to classmates and solved numerical problems repeatedly until the method became automatic. In Social Science, they built timelines, maps and flow charts so that facts connected into a story rather than a list.",

    "A word for younger students",
    "For students in Grades 8 and 9 who are already looking ahead to their own board year, the message from this batch is encouraging: there is no secret formula, only steady effort. Start building good habits now. Keep your notebooks tidy, revise at the end of each chapter, read for pleasure, and take part in activities that stretch you. The qualities that produced these results, such as curiosity, discipline and kindness toward classmates, can be developed at any age, and the school's teachers will help you every step of the way.",

    "Results at a glance",
    "Overall toppers: Medhavi Sikka (97.6%), Abhinav Gupta (97.2%), Sakshi Bajeli (96.8%), Sparsh Saini (96.2%) and Snigdha Mishra (96.2%). Perfect 100 scores were recorded in Sanskrit, French, Information Technology and Artificial Intelligence. High distinctions were also achieved in English, Hindi, Science, Mathematics, Social Science and German.",
    "Parents seeking guidance on stream selection or subject combinations are welcome to contact the school office to schedule a counselling session.",
  ].join("\n\n"),
  published: true,
};

// ---------- Story 3: 03-class12-board-toppers.js ----------
const s03 = {
  title: "CBSE Class 12 Results 2026: Toppers Across Science, Commerce and Humanities",
  slug: "cbse-class-12-board-toppers-2026",
  category: "Achievement",
  date: new Date("2026-07-14T09:00:00.000Z"),
  imageKey: "class12Toppers",
  shortDescription:
    "Nandni Singh leads Science with 94%, Ridhima Saxena and Aarya Vyas top Commerce with 92.6%, and Srishti Singh leads Humanities with 91.2% in the Class 12 board examinations.",
  content: [
    "The Class 12 board examinations mark the end of a school journey and the beginning of a larger one. For our graduating students, the results were a moment of pride, relief and gratitude, and for the school they were a reminder of how much young people can accomplish when they are supported by committed teachers and patient families. The Manthan School congratulates every student of Grade 12 and wishes them well as they step into higher education and careers.",

    "Science stream: Nandni Singh leads",
    "In the Science stream, Nandni Singh secured the top position with 94 per cent. Her result was built on strong, balanced performance: she scored 99 in English and 95 in Chemistry, and her steady work in the sciences reflected a careful, methodical approach to learning. Meet Kalpesh Gurjar also earned distinction in the sciences, scoring 95 in Chemistry, while Shaurya Gupta scored 97 in Mathematics and Vanshika Goel scored 95 in Biology.",
    "Science students at the school follow a rigorous programme that combines classroom instruction, laboratory work and regular assessment. Teachers describe this batch as unusually collaborative: students formed study groups, shared notes, explained difficult concepts to one another and gave each other the confidence to attempt challenging problems. That spirit is as important to future scientists as any single formula.",

    "Commerce stream: Ridhima Saxena and Aarya Vyas share the top spot",
    "In Commerce, Ridhima Saxena and Aarya Vyas both achieved 92.6 per cent, sharing the stream's top position. Ridhima also scored 100 in Painting and 93 in Accountancy, a combination that reflects her creativity and her discipline. Aarya Vyas scored 94 in Economics and 93 in Business Studies, showing a clear grasp of the principles that underlie markets and organisations.",
    "The Commerce programme at the school aims to go beyond memorising definitions. Students work with case studies, practise reading financial statements, and discuss how economic decisions affect real people. Events such as the Financial Literacy workshop and the Career Fair have helped them connect classroom ideas with future careers in accounting, finance, entrepreneurship and management.",

    "Humanities stream: Srishti Singh leads",
    "Srishti Singh topped the Humanities stream with 91.2 per cent, including a score of 93 in Sociology. Humanities students at the school are encouraged to read widely, write clearly and think critically about society. Their subjects, which include Psychology, Political Science, Sociology and Fashion Studies, help them make sense of human behaviour, institutions and culture.",
    "Other notable subject scores in this stream include Vanshika Goel and another classmate with 99 in Psychology, Anasya Giri with a strong result in Political Science, Joanna Das with 97 in Fashion Studies and Shankadhar with 91 in Home Science. These results show that humanities and applied subjects are producing outstanding work at the school.",

    "Perfect scores in Painting",
    "Art is a core part of life at The Manthan School, and this year's results show how seriously students take it. Ridhima Saxena, Arnav Mishra and Mannan Giri each scored 100 in Painting. Behind a perfect score in an art subject lies thousands of hours of practice, careful study of colour, form and composition, and the courage to express an individual vision.",
    "Art teachers note that these students did not treat Painting as a way to pad their marks. They approached it as a serious discipline, visiting galleries, studying techniques, and presenting their work at school exhibitions. Their achievement is a reminder that creative subjects deserve the same respect as any other part of the curriculum.",

    "Distinctions in physical education and languages",
    "Mrinal Shrikrishna scored 98 in Physical Education, reflecting both theoretical understanding and sustained involvement in sport. Nandni Singh's 99 in English shows excellent command of language. Strong results in languages and in physical education point to students who have developed their communication skills and their physical well-being alongside their academic subjects.",

    "Preparing for the boards: a year-long effort",
    "Success in Class 12 is rarely the result of a final-term sprint. Our students began preparing at the start of Grade 11, building conceptual foundations and developing steady habits. Regular unit tests, pre-board examinations and teacher feedback helped them see where they stood and what needed attention. Teachers made themselves available beyond classroom hours, offering doubt-clearing sessions and personal guidance.",
    "The school also tried to protect students' mental health during this demanding year. Counsellors held sessions on time management, stress and sleep. Yoga and sports remained a fixed part of the weekly routine. Teachers who attended the Psychological First Aid workshop learned how to recognise signs of distress and respond with empathy, and that training has made a real difference to how students are supported during examination season.",

    "What lies ahead",
    "With results announced, our graduates are now navigating admissions, entrance examinations and career decisions. The school's counselling team continues to support them with guidance on college choices, scholarships, application processes and personal statements. Many students are applying to universities in India across fields such as engineering, medicine, commerce, law, design, psychology and the humanities, while some are exploring opportunities abroad.",
    "We encourage students to choose paths that match their interests and strengths. Marks open doors, but curiosity, resilience and character determine how far a person walks through them. We are confident that our graduates possess these qualities.",

    "Advice from the toppers",
    "When invited to advise juniors, the toppers shared a consistent message. Build a routine early. Understand concepts before memorising them. Practise previous years' papers under timed conditions. Take care of your health. Ask for help early. Do not compare your progress to others'; compare it with where you were last month. And remember that failure to meet a goal is information, not a verdict.",
    "Teachers added that the students who thrived were those who stayed curious. They read beyond the textbook, asked why things were so, and approached each subject as a way of seeing the world rather than a hurdle to be cleared.",

    "A note to parents",
    "To our parents, thank you. Your patience during late evenings, your calm during stressful weeks and your unwavering belief in your children made this achievement possible. We hope you will continue to support your children as they begin their next chapter, giving them room to make their own decisions and learn from them.",
    "To those families whose children did not achieve everything they hoped for, please know that your child's worth is not defined by a percentage. Our teachers and counsellors are ready to help with any questions about re-evaluation, supplementary options, or alternative pathways.",

    "From the Principal's desk",
    "At the celebratory assembly, the Principal, Ms. Poonam Kumar Mendiratta, congratulated the graduating batch and reminded them that the true measure of an education is what a person does with it. She urged students to remain humble, to keep learning, and to use their skills in the service of others. The Headmistresses and teachers echoed these sentiments and wished the students every success.",
    "To the Class of 2026: you have made us proud. The school will always be your home, and we hope you will return to share your stories and inspire the students who follow you.",

    "Life beyond the marksheet",
    "The Class of 2026 leaves behind more than results. Many of these students served as house captains, led morning assemblies on themes such as empathy and the role of youth in nation building, took part in sports and cultural competitions, and mentored juniors. Some represented the school in inter-school events, and others volunteered in the Interact Club's community drives. These experiences taught them leadership, communication and teamwork, qualities that employers and universities value highly.",
    "Teachers often say that a school can be judged by how its seniors treat its youngest students. By that measure, this batch has been exceptional. They welcomed new classmates, helped juniors prepare for events, and set a tone of respect in corridors and classrooms. These are the achievements that do not appear on a marksheet but that will be remembered longest.",

    "Support after school",
    "The relationship between the school and its graduates does not end with the board examination. Alumni are welcome to return for career talks, to guide younger students on college applications and to take part in school events. The counselling team remains available for letters of recommendation, document verification and advice on transition challenges such as living away from home for the first time.",
    "We also invite our toppers and alumni to share their experiences at the school's Career Fair, where students from Grades 9 to 12 explore professions and meet professionals. Hearing directly from someone who sat in the same classroom a year ago is often the most persuasive inspiration a young person can receive.",

    "How the school supports every stream",
    "Each stream at The Manthan School has its own rhythm. Science students balance lectures with laboratory practicals and project work. Commerce students combine textbook study with case discussions, mock business exercises and calculation practice. Humanities students write essays, debate current affairs and prepare research projects. Across all three, the school provides subject-specialist teachers, regular mentoring, and opportunities to apply learning through workshops, visits and competitions.",
    "This year, students also benefited from exposure beyond the classroom: science talks and laboratory visits, a financial literacy session, career guidance events and internship opportunities during the summer vacations. These experiences help students connect what they study with what they might do, which in turn makes the effort of preparing for examinations feel purposeful.",

    "Results at a glance",
    "Science: Nandni Singh (94%). Commerce: Ridhima Saxena (92.6%) and Aarya Vyas (92.6%). Humanities: Srishti Singh (91.2%). Perfect scores: Painting (Ridhima Saxena, Arnav Mishra, Mannan Giri). Other distinctions: English 99, Psychology 99, Physical Education 98, Mathematics 97, Fashion Studies 97, Chemistry 95, Biology 95, Computer Science 95, Economics 94, Business Studies 93, Accountancy 93, Sociology 93.",
    "Families seeking guidance on college applications, entrance examinations or scholarship options are invited to contact the school's counselling team.",
  ].join("\n\n"),
  published: true,
};

// ---------- Story 4: 04-orientation-day-principal-summit.js ----------
const s04 = {
  title: "A New Session Begins: Orientation Day 2026-27 and Our Principal at the ET Education Summit",
  slug: "orientation-day-2026-27-principal-education-summit",
  category: "News",
  date: new Date("2026-07-02T09:00:00.000Z"),
  imageKey: "orientation",
  shortDescription:
    "Parents joined us for Orientation Day to align on a 'Future-Ready' vision, while Principal Ms. Poonam Kumar Mendiratta shared insights at The Economic Times 3rd Annual Education Summit 2026.",
  content: [
    "Every academic session begins with a moment when the school gates open and the building fills again with voices. This year, that moment carried a particular sense of anticipation. The 2026-27 session at The Manthan School opened with Orientation Day, the annual event that brings parents and guardians together with teachers and school leaders to align on the year ahead. In the same weeks, our Principal, Ms. Poonam Kumar Mendiratta, represented the school at The Economic Times 3rd Annual Education Summit 2026, contributing to national conversations about where education is heading. Together, these two events show the spirit of the new session: rooted in the community, and open to the wider world.",

    "Orientation Day: aligning our collective aspirations",
    "Orientation Day is, in many ways, the cornerstone of the school year. It is the one occasion when every family hears directly from the school's leadership about the vision, priorities and expectations for the months to come. As the gates swung open for the 2026-27 session, parents and guardians arrived to a warm welcome, and the atmosphere was one of shared purpose.",
    "The school's vision for this session goes beyond traditional rote learning. We are committed to creating an environment where intellectual rigour meets emotional intelligence. Our aim is to cultivate 'Future-Ready' scholars: young people who possess not only the academic credentials to succeed, but also the moral compass to lead in an increasingly complex global landscape. Families heard how this aim translates into classroom practice, assessment design, co-curricular activities and the daily culture of the school.",

    "What 'Future-Ready' means in practice",
    "The phrase 'future-ready' is used often, and it deserves a plain explanation. For us, it means four things. First, strong foundations: children must read fluently, write clearly, reason mathematically and understand the scientific method. Second, transferable skills: communication, collaboration, creativity, critical thinking and digital literacy. Third, character: honesty, empathy, responsibility and resilience. Fourth, adaptability: the confidence to learn new things throughout life.",
    "Each of these is built through specific school practices. Active learning strategies ensure that students are doing the thinking in class rather than listening passively. Skill-based programmes, such as the Skill Mela and Bagless Day, give students a chance to apply knowledge. Workshops on social and emotional learning, life skills and financial literacy prepare them for situations a textbook cannot anticipate. And a strong culture of assemblies, service and sport reinforces character.",

    "A year of experiential learning",
    "Parents learned that the year ahead is rich with opportunities. The school will host skill-building workshops, educational visits to institutions such as IIT Delhi and the National Physical Laboratory, leadership roles for students in morning assemblies and clubs, and enrichment events across all age groups. One of the highlights of the session will be Tasveer, our Annual Day celebration, where every child will have a chance to showcase talent, confidence and creativity on stage.",
    "Teachers explained that experiential learning is not a replacement for academic rigour but a way of deepening it. A student who has built a hydroponic model, designed a campaign, or negotiated a role in a debate understands the associated ideas more deeply than one who has only read about them. The school's goal is for every child to experience this kind of learning several times a year.",

    "Partnership between school and home",
    "A central message of Orientation Day was the importance of partnership. Children learn best when the adults around them share expectations and communicate openly. Parents were introduced to the school's channels of communication, including the diary, parent-teacher meetings, circulars and the newsletter, and were encouraged to raise questions early rather than wait for a formal meeting.",
    "Teachers also offered practical suggestions for supporting learning at home. Establish a consistent routine for homework and sleep. Read together for at least a few minutes every day. Ask your child to explain what they learned in school instead of asking only whether they did their homework. Limit screen time and encourage outdoor play. Praise effort and curiosity as much as results. These simple habits, repeated over months, have a larger effect on a child's growth than any single intervention.",

    "Safety, discipline and well-being",
    "The school also used Orientation Day to reaffirm its commitments on safety, discipline and student well-being. Parents were briefed on the code of conduct, which asks students to be punctual, wear the prescribed uniform, maintain discipline in classrooms and corridors, use technology responsibly and treat others with respect, and which asks them to refrain from disrespectful language, damaging school property and littering. They were also introduced to the school's counselling support and its partnership with healthcare professionals for workshops on topics such as safe and unsafe touch, emotional well-being and nutrition.",
    "Parents of younger children were particularly interested in the early years programme, which blends play, stories, music and movement with gentle introduction to literacy and numeracy. Teachers described how each child's progress is observed and documented so that support can be tailored to individual needs.",

    "The Principal at The Economic Times 3rd Annual Education Summit 2026",
    "Even as the new session was getting under way, the school was represented on a national platform. Ms. Poonam Kumar Mendiratta, Principal of The Manthan School, participated in The Economic Times 3rd Annual Education Summit 2026. The summit brought together eminent educators, academic leaders, policymakers and industry experts to deliberate on emerging trends, challenges and opportunities shaping the future of education.",
    "Ms. Mendiratta contributed valuable insights to the discussions, sharing her perspectives on the evolving educational landscape, on innovative approaches to teaching and learning, and on the significance of collaborative efforts in nurturing future-ready learners. Her participation offered an opportunity to engage in meaningful dialogue and to exchange ideas with leading voices from the education sector.",

    "Why such platforms matter to a school",
    "It is fair to ask why a school leader's time at a summit matters to families. The answer is that education is changing quickly. New curriculum frameworks, competency-based assessment, the rise of artificial intelligence, concern for student mental health and the demand for skill-based learning are all reshaping what schools must do. A school that closes itself off from these conversations risks being left behind. A school that participates, listens and contributes can bring the best ideas home and adapt them thoughtfully.",
    "The insights gained at the summit feed directly into professional development at the school. In recent months, teachers have taken part in workshops on learning outcomes and pedagogy, active learning strategies, psychological first aid and life skills. The common thread is a commitment to keep improving, so that classrooms remain places where children are challenged, supported and inspired.",

    "Collaborative effort and shared responsibility",
    "One theme running through the summit was the idea that education is a collective responsibility. Schools, parents, policymakers, industry and communities each play a part. At The Manthan School, we see this every day: parents who volunteer for events, professionals who give talks to students, partner organisations that run workshops, and alumni who return to mentor. The Principal's contribution reflected this belief in collaboration and the school's wider commitment to academic excellence, innovation and transformative education.",
    "The summit also reaffirmed that educators have a responsibility to build an inclusive, progressive and future-ready education system. Inclusion, in particular, is a priority for the school. Students have visited inclusive learning environments, held conversations about empathy and diversity, and participated in activities that encourage them to see strengths in every classmate.",

    "A message for parents at the start of the year",
    "For parents reading this newsletter story, we offer a few thoughts as the session begins. Give your child time to settle. The first weeks of a new grade can be tiring, and children often need patience as they adjust to new teachers, routines and expectations. Stay in touch with the class teacher. Attend parent-teacher meetings. Encourage your child to take part in at least one activity beyond academics, whether it is sport, music, art, debate or community service. And trust the process: real learning is gradual, and the results of good habits accumulate over time.",
    "To our students: welcome back. Be curious. Be kind. Take risks and learn from mistakes. Each day offers a new opportunity to learn, to inspire others and to make a difference.",

    "Frequently asked questions from parents",
    "As always, parents had thoughtful questions during the open session. Many asked how the school balances academics with activities. The answer, teachers explained, is a carefully planned calendar in which assessments, events and holidays are spaced so that no single month becomes overwhelming. Others asked about homework. The school's approach is to set purposeful tasks that reinforce learning rather than long assignments that simply occupy time, and to adjust the load for younger children.",
    "Questions about technology were also common. Teachers described a measured approach: digital tools are used where they genuinely improve learning, such as research, presentations and coding, while handwriting, reading from books and face-to-face discussion remain central. Parents were encouraged to agree on clear screen-time rules at home and to model healthy habits themselves.",

    "Looking forward to Tasveer and the months ahead",
    "The coming months promise a full calendar. Students will take part in assemblies, competitions, workshops, field visits and sports events. Tasveer, the Annual Day celebration, will give every child a chance to shine. Teachers will continue their professional development, and the school will keep seeking partnerships that enrich learning.",
    "We thank every parent who attended Orientation Day, every teacher who prepared for it, and the staff who made sure the day ran smoothly. We also thank our Principal for representing the school with distinction. Together we begin the 2026-27 session with energy, hope and a clear sense of purpose: to nurture learners who are ready for the future, and to do so with care, rigour and joy.",
  ].join("\n\n"),
  published: true,
};

// ---------- Story 5: 05-skill-mela-bagless-day.js ----------
const s05 = {
  title: "Learning Beyond the Textbook: Skill Mela, Bagless Day, Tie-and-Dye and Hydroponics",
  slug: "skill-mela-bagless-day-learning-beyond-textbook",
  category: "Event",
  date: new Date("2026-07-06T09:00:00.000Z"),
  imageKey: "baglessDay",
  shortDescription:
    "From a CBSE-aligned Skill Mela to Bagless Day posters, natural-dye workshops and a hydroponics session, our students spent the term learning by doing.",
  content: [
    "There is a particular kind of energy in a school when the timetable is set aside and children are invited to make, build, perform and compete. At The Manthan School, that energy has been very visible this term. Through the Skill Mela, Bagless Day for different grades, a Tie-and-Dye workshop based on natural pigments and an online workshop on hydroponics, students have spent days learning in ways that no worksheet can replicate. This story brings these events together, because they share a common idea: knowledge becomes lasting when it is used.",

    "The Skill Mela: bridging pedagogy and practice",
    "The Skill Mela was organised in alignment with the vision of the Central Board of Secondary Education, which encourages schools to promote skill-based and experiential learning. The mela took the form of interactive exhibits and activities in which students demonstrated what they can do rather than simply what they know.",
    "Four skills were at the heart of the event: communication, creativity, collaboration and problem-solving. At different stalls, students explained concepts to visitors, designed products, worked in teams to solve challenges and presented their ideas with confidence. Visitors were not passive observers; they were invited to try activities, ask questions and give feedback. The result was a lively, noisy and joyful exhibition in which learning was visible everywhere.",
    "Teachers noted that the mela changed the way many students saw themselves. Children who are sometimes quiet in class turned out to be gifted explainers. Others who find written examinations stressful shone when asked to build or design something. By valuing different kinds of ability, the mela reminded everyone that intelligence has many forms, and that confident, adaptable learners are made when schools recognise this.",

    "Why skill education matters",
    "Employers and universities increasingly say that they look for more than subject knowledge. They look for people who can communicate clearly, work well in teams, think creatively and learn new things quickly. These are skills, and like any skills they develop through practice. A child who has had repeated chances to present, to collaborate and to solve open-ended problems will enter adulthood better prepared than one who has only memorised answers.",
    "The Skill Mela is one of several school practices designed to give such practice. Others include the active learning strategies adopted by teachers, the Prismatic programme, internships during summer vacations and the Career Fair held on Bagless Day. Together they form a pathway from curiosity in the early years to confidence in the senior school.",

    "Bagless Day in the middle school",
    "Students of Grades 6, 7 and 8 set aside their academic schedules for the school's much-anticipated Bagless Day. There were no bags, no textbooks and no timetable, only themed activities designed to deepen understanding in creative ways.",
    "Grade 6 students took part in the activity 'Earth Day: Save Our Planet', creating impactful posters to spread awareness about environmental conservation. Their posters used slogans, illustrations and facts to argue for reducing waste, saving water and protecting trees. Grade 7 students explored the theme 'Heritage Day: Our Roots, Our Pride', showcasing the importance of preserving cultural and historical values through art, display boards and short presentations. Grade 8 students reflected on 'Cultural Unity: One World, One Family' through collaborative artistic projects that highlighted global harmony and citizenship.",
    "The themes were chosen deliberately. Environmental responsibility, cultural heritage and global citizenship are values the school wants every student to carry. By asking students to express them through original work, Bagless Day turned abstract ideas into personal commitments.",

    "The Tie-and-Dye workshop: art meets chemistry",
    "A specialised Tie-and-Dye workshop introduced students to the mechanics of fabric manipulation. Participants learned several techniques. Spiral patterns achieve radial symmetry through careful binding at the centre of the cloth. Crumple methods create organic, marbled textures through irregular compression. Stripe techniques use linear resistance to define clean geometric boundaries.",
    "Beyond the aesthetics, the workshop emphasised the chemistry of natural pigments. Students experimented with dyes derived from turmeric, beetroot, flowers and leaves, observing how colour changes with the type of material and the duration of soaking. The resource person provided historical context, explaining the pre-industrial reliance on botanical dyes and the contemporary environmental benefits of returning to non-toxic, biodegradable materials.",
    "Students were fascinated to learn that a kitchen spice could colour cloth, and that colours made from plants were used for centuries before synthetic dyes arrived. Many asked why some dyes fade faster than others, a question that led naturally to a discussion of mordants, fixing agents and the importance of testing. The workshop was a reminder that art and science are not separate subjects but neighbours that share a fence.",

    "Hydroponics: learning sustainable farming",
    "An online workshop on hydroponics was conducted for Grade 8 students on 15 May. The session introduced them to the concept of growing plants without soil, using nutrient-rich water instead, and highlighted why this method is of growing interest in discussions about sustainable farming. Students learned about the basic components of a hydroponic system, the nutrients that plants require, and the advantages and limitations of the method.",
    "Participants asked thoughtful questions about water usage, cost, energy requirements and the types of crops best suited to the technique. They actively engaged with the presenter and gained valuable knowledge about modern agricultural techniques. The workshop was informative and enriched their understanding of environmental sustainability, helping them see agriculture as a field full of innovation and opportunity.",

    "Bagless Day in the senior school",
    "Senior students enjoyed their own version of Bagless Day, a refreshing break from regular classroom learning that offered an exciting day of fun, sports and skill-based activities. Students enthusiastically took part in separate races for boys and girls, a relay race, an English Debate Competition and a Career Fair.",
    "The Career Fair deserves a special mention. Students explored diverse career options, spoke with representatives about what different professions involve, and gained valuable insights into the skills and qualifications required. For many, it was the first time they had seen how their subject choices connect with real careers. The English Debate Competition, meanwhile, tested their ability to research, structure arguments and respond to opponents with courtesy and wit.",
    "The day encouraged active participation, healthy competition, critical thinking and holistic development, while reminding everyone that learning extends far beyond textbooks.",

    "What students learned about themselves",
    "In conversations afterwards, students described discoveries about themselves. One said she had not realised how much she enjoyed designing until she created a poster. Another discovered that he was good at leading a team. A third found that she could speak in front of an audience when the topic was something she cared about. Teachers consider these moments of self-discovery among the most valuable outcomes of any school event.",
    "They also noticed improved relationships. Working on a shared project across sections and houses encouraged students to talk to classmates they did not usually spend time with, and friendships formed or deepened as a result. Collaboration, after all, is learned by collaborating.",

    "Connecting activities to the curriculum",
    "Every activity described here was linked to learning goals. Posters supported language, art and environmental science objectives. Heritage and cultural unity themes connected to history, geography and civics. The Tie-and-Dye workshop supported chemistry concepts such as solubility and reactions, as well as design principles such as symmetry and pattern. The hydroponics session reinforced biology and environmental studies. Debates and career exploration supported communication and personal development.",
    "This alignment is intentional. Teachers who attended the workshop on Learning Outcomes and Pedagogy have been mapping classroom and co-curricular activities to specific outcomes, ensuring that events are not just enjoyable but purposeful. Students are therefore building skills that will help them in examinations and beyond.",

    "Tips for continuing hands-on learning at home",
    "Parents often ask how they can extend this kind of learning beyond school hours. Here are a few ideas that need very little preparation. Try a kitchen experiment, such as using turmeric or beetroot to colour fabric or paper and observing how the colour changes. Grow a small plant in a glass of water and record its progress over several weeks. Ask your child to design a poster about something they care about, then present it to the family. Visit a museum, a heritage site or a local market and talk about the people and stories behind what you see. Invite a relative with an unusual job to describe a typical day. These small activities encourage curiosity, communication and creativity, and they make learning a family habit rather than a school-only duty.",

    "Thanks to everyone who made it happen",
    "The school thanks the resource persons who led the workshops, the teachers who planned and coordinated each activity, and the support staff who set up venues and managed logistics. We thank the parents who supported their children's participation and sent materials, and above all the students, whose enthusiasm made every event a success.",
    "As the session continues, the school will keep creating opportunities for hands-on learning. We hope students will carry the spirit of these days into every classroom: ask questions, try things out, work with others and take pride in making something with your own hands and mind.",

    "Event snapshot",
    "Skill Mela: interactive exhibits promoting communication, creativity, collaboration and problem-solving, aligned with CBSE's vision. Middle school Bagless Day: Grade 6 'Earth Day: Save Our Planet' posters, Grade 7 'Heritage Day: Our Roots, Our Pride', Grade 8 'Cultural Unity: One World, One Family'. Workshops: Tie-and-Dye with natural pigments, online Hydroponics session (15 May, Grade 8). Senior Bagless Day: boys' and girls' races, relay, English Debate Competition and Career Fair.",
  ].join("\n\n"),
  published: true,
};

// ---------- Story 6: 06-early-years-wellbeing.js ----------
const s06 = {
  title: "Little Learners, Big Hearts: Emotions, Safety, Culture and Mother's Day in the Early Years",
  slug: "early-years-wellbeing-sel-safe-touch-iskcon-mothers-day",
  category: "News",
  date: new Date("2026-07-10T09:00:00.000Z"),
  imageKey: "earlyYears",
  shortDescription:
    "Our Early Years learners explored feelings in an SEL workshop, learned body safety with Fortis Healthcare, visited the ISKCON Temple and celebrated Mother's Day, while parents attended a workshop on fussy eaters.",
  content: [
    "The early years are the foundation of everything that comes after. In these first years at school, children learn not only letters and numbers but how to understand feelings, how to be safe, how to belong to a community and how to show love. The past few weeks at The Manthan School have been full of experiences that nurture these qualities. Early Years students took part in a Social and Emotional Learning workshop, a Safe and Unsafe Touch workshop with Fortis Healthcare, an educational visit to the ISKCON Temple and a heartwarming Mother's Day celebration, while parents attended a helpful session on fussy eaters. Here is a closer look at each.",

    "Understanding feelings: the Social and Emotional Learning workshop",
    "Young children feel emotions intensely but rarely have the words to describe them. A child who is frustrated may cry, hit or withdraw because she does not yet know how to say, 'I feel left out and I do not like it'. The Social and Emotional Learning (SEL) workshop conducted by Dr. Akshara Shukla Tiwari was designed to give our youngest learners these words and the skills that go with them.",
    "Through interactive stories, games and carefully designed activities, children explored the importance of recognising and expressing emotions. They talked about what it feels like to be happy, sad, angry, nervous or excited, and about what they can do when a feeling is big. The session helped them develop empathy by asking them to imagine how a character in a story might feel and what a friend could do to help. They also practised self-regulation: taking deep breaths, counting slowly and using calm words.",
    "The workshop took place in a warm and supportive environment, and children participated eagerly. Teachers have already noticed the vocabulary of the session appearing in the classroom: children saying, 'I am feeling upset' or 'Can I have a calm-down minute?' These small signs show that the lessons are taking root. By promoting kindness, confidence and cooperation, the workshop played a meaningful role in nurturing emotional well-being and equipping students with essential life skills.",

    "Why emotional learning comes first",
    "Research in child development consistently shows that children who can identify and manage their emotions find it easier to concentrate, make friends and cope with challenges. Emotional skills are not an extra layer on top of academic skills; they are what makes academic learning possible. A child who is anxious or overwhelmed cannot learn effectively, while a child who feels secure and understood is ready to explore.",
    "That is why SEL is woven into daily routines in our Early Years classrooms: circle time conversations, stories about feelings, role play, music and movement, and the way teachers respond when children are upset. The workshop with Dr. Tiwari added to this foundation and gave teachers and children new tools.",

    "Body safety: the Safe and Unsafe Touch workshop",
    "In association with Fortis Healthcare, Early Years students took part in an interactive workshop on Safe and Unsafe Touch. This is a sensitive subject, and it was handled with great care, using age-appropriate stories, discussions and engaging activities that did not frighten or confuse the children.",
    "Children learned about personal boundaries and body safety. They were helped to understand that their bodies belong to them, that they have the right to say no to touch that makes them uncomfortable, and that they should tell a trusted adult if something does not feel right. The session emphasised the importance of recognising trusted adults, such as parents, teachers and family members, and of speaking up even if they feel shy or worried.",
    "The workshop was conducted in a safe and supportive environment. Children were reassured that they would never be in trouble for telling the truth. The session helped foster confidence, awareness and self-protection skills, empowering young learners to express themselves freely and seek help when needed. Parents are encouraged to continue the conversation at home, using simple language and calm, reassuring tones. Teachers can offer guidance for families who would like suggestions on how to do this.",

    "A workshop for teachers on child protection",
    "Protecting children is a shared responsibility, and the school's commitment extends to its staff. A workshop for teachers strengthened awareness about child protection, gender equality and creating a safe, secure and healthy learning environment. The session highlighted the provisions of the POCSO Act, the importance of identifying and reporting concerns, and the role of educators in fostering care, respect, inclusion and empathy.",
    "The workshop reinforced the school's commitment to ensuring the safety, dignity and well-being of every child. Teachers left with a clear understanding of their responsibilities and of the steps to take if a concern arises.",

    "Exploring culture: a visit to the ISKCON Temple",
    "Learning is not confined to the classroom, and the Early Years students enjoyed a memorable educational visit to the ISKCON Temple. They experienced the serenity and beauty of the temple surroundings and learned about Indian culture, values and traditions in an engaging and experiential manner.",
    "Surrounded by a peaceful environment, the young learners developed a deeper understanding of respect, gratitude and mindfulness. They observed the architecture, listened to guides explain the significance of rituals and sat quietly during moments of reflection. Their curiosity and enthusiasm made the visit truly special: children asked about the colours, the music, the idols and the stories behind them.",
    "Teachers followed up in class with drawing, storytelling and discussion, asking children to describe what they saw and how it made them feel. The experience enriched their learning beyond the classroom, created cherished memories, and encouraged a sense of wonder and appreciation for India's rich cultural heritage.",

    "Celebrating the unconditional love of mothers",
    "Mother's Day was celebrated with great enthusiasm and warmth. The Early Years students added charm to the celebration through heartfelt performances, delightful presentations and creative activities. They sang songs, recited poems and enacted little skits about the everyday ways in which mothers care for their families.",
    "The children also expressed gratitude by presenting beautifully handmade tokens of appreciation, such as cards, paper flowers and decorated bookmarks. Preparing these gifts was a lesson in itself: children thought about what their mothers like, practised cutting, colouring and pasting, and learned to say thank you in words and in gestures.",
    "The celebration gave children a wonderful opportunity to acknowledge the special bond they share with their mothers, and gave the mothers a joyful morning in which to see their children shine. Filled with love, joy and cherished moments, the event became a memorable experience for everyone, and beautifully reflected the innocence, affection and gratitude of our young learners.",

    "Parents' workshop: Fussy Eaters, Fancy Cheaters",
    "Mealtimes can be a source of stress for families of young children, so a special parent workshop titled 'Fussy Eaters, Fancy Cheaters', conducted by Dt. Rachna Joshi, was warmly received. Focused on nutrition for children aged three to seven, the session provided valuable insights into managing picky eating habits.",
    "The dietitian equipped parents with practical nutrition tips, creative meal ideas and positive strategies to encourage children to make healthier food choices. Through an engaging and informative discussion, parents explored ways to make mealtimes joyful, balanced and stress-free. Themes included offering new foods repeatedly without pressure, involving children in simple kitchen tasks, serving small portions, avoiding bribes and punishments, and being a role model by eating a variety of foods.",
    "The workshop highlighted the importance of patience, consistency and a positive mealtime environment in nurturing lifelong healthy food habits. Many parents said they left feeling reassured that fussiness is common and manageable. The school also encourages children to bring a healthy lunch and to finish their meals properly, and the workshop's tips will support this practice.",

    "What we hope to see in the weeks ahead",
    "Experiences like these are most valuable when they change everyday behaviour, so teachers will be watching for small signs of growth. We hope to see children using feeling words in their own conversations, offering help to a friend who is upset, and trying calm breathing when they are frustrated. We hope to see them name the adults they trust and speak up confidently when something feels wrong. We hope the temple visit and Mother's Day activities will spill into play, drawing and storytelling, and that children will think of new ways to say thank you to the people who care for them.",
    "Moments like these are why we invest in experiences rather than only instructions. Children absorb values most deeply when they can feel, see, touch and act on them, and our teachers are skilled at turning such moments into lasting lessons. We will continue to observe, reinforce and celebrate this growth throughout the session.",

    "A community that cares",
    "Taken together, these activities reveal what the school hopes to give every young learner: a secure emotional base, the knowledge to keep themselves safe, an understanding of their culture and heritage, the habit of gratitude and the foundations of healthy living. None of these appears on a report card, but all of them shape the kind of person a child grows up to be.",
    "We thank Dr. Akshara Shukla Tiwari, Fortis Healthcare, Dt. Rachna Joshi and all our resource persons for their time and expertise, and our teachers for the patience and creativity they bring to the youngest classrooms every day. We also thank parents for the trust they place in us and for their active participation.",

    "How parents can continue the learning at home",
    "To reinforce what children have learned, families can try a few simple practices. Ask your child each evening how they felt during the day and listen without correcting. Read stories about feelings and talk about them. Use correct names for body parts and calmly explain the idea of body safety. Eat together as a family without screens. Visit a local place of worship or cultural site and talk about what you see. And say thank you to the people who care for you, so that your child learns by watching.",
    "Our Early Years teachers are always happy to talk with families about how to support their child's development, and we look forward to many more shared experiences in the weeks ahead.",
  ].join("\n\n"),
  published: true,
};

// ---------- Story 7: 07-teachers-professional-growth.js ----------
const s07 = {
  title: "Teachers Who Keep Learning: Workshops, a UNESCO-RIDS Recognition and a CBSE Capacity Building Programme",
  slug: "teachers-professional-growth-workshops-unesco-rids-award",
  category: "Achievement",
  date: new Date("2026-07-16T09:00:00.000Z"),
  imageKey: "teachers",
  shortDescription:
    "Our faculty took part in workshops on learning outcomes, active learning, psychological first aid, life skills, financial literacy and mental well-being, and were honoured with a recognition from RIDS and UNESCO.",
  content: [
    "A school can only be as good as its teachers, and the best teachers are those who never stop learning. At The Manthan School, professional development is not a once-a-year formality. It is a continuous, planned effort to give teachers new knowledge, fresh strategies and the confidence to try them. In recent months our faculty have taken part in a rich series of workshops covering curriculum, pedagogy, student well-being, life skills and financial literacy, and the school's teachers were honoured in an award ceremony after receiving a recognition from RIDS and UNESCO. This story brings together those efforts and explains why they matter for every child.",

    "Learning Outcomes and Pedagogies",
    "The workshop titled 'Learning Outcomes and Pedagogies' was organised to equip faculty with the tools needed to implement the latest CBSE academic frameworks. It was led by Ms. Mukta Mishra and Ms. Nishi Saxena, distinguished CBSE resource persons. The primary objective was to bridge the gap between theoretical curriculum standards and practical classroom delivery, ensuring that every instructional hour is purposefully aligned with specific, measurable learning outcomes.",
    "A hands-on training session formed a major part of the workshop. Teachers practised mapping classroom activities to CBSE learning outcomes. They learned to design assessments aligned with learning objectives and to apply the backward design process while planning lessons: beginning with the desired result, deciding what evidence would show that students have achieved it, and only then planning the activities that lead there.",
    "The workshop highlighted the importance of aligning teaching strategies, classroom activities and assessments to ensure meaningful, competency-based learning experiences. It concluded with a reflective discussion on the long-term impact on professional growth and school culture. Teachers described the session as practical and energising, with ideas they could use in the following week.",

    "Active Learning Strategies",
    "A professional development workshop on Active Learning Strategies was conducted by the Principal for all teaching staff, with the objective of promoting student-centred learning and enhancing classroom engagement. Teachers were introduced to twenty innovative instructional strategies designed to shift the focus from passive teaching to active student participation.",
    "Emphasising the philosophy of placing students at the centre of the learning process, the Principal highlighted the importance of fostering critical thinking, collaboration, metacognition and real-world problem-solving. Teachers were encouraged to move beyond rote memorisation and create meaningful learning experiences that lead to 'Learning that Lasts'.",
    "As part of the implementation plan, every teacher has been asked to adopt at least one active learning strategy in the classroom and to document its impact on student engagement and learning outcomes in the teacher's diary. This simple requirement turns the workshop from an event into a habit, because it encourages reflection and gives the school evidence about what works. The workshop concluded with a call for continuous professional reflection and a collective commitment to engaging, inspiring and empowering students through innovative teaching practices.",

    "Life Skills: preparing teachers for the modern classroom",
    "A workshop on Life Skills Basics was conducted by Headmistress Chhavi Ma'am. The session aimed to equip teachers with essential skills required for effective teaching in the modern educational landscape. Key areas discussed included digital literacy, pedagogical innovation and socio-emotional learning, with an emphasis on technology integration, innovative teaching methodologies and the emotional well-being of students.",
    "Addressing the faculty, the Headmistress encouraged teachers to embrace these contemporary practices to prepare students for future challenges and opportunities. An interactive question-and-answer session allowed teachers to clarify doubts and share perspectives. The workshop was widely regarded as a significant step toward enhancing the quality of teaching and learning in the school.",

    "Psychological First Aid",
    "Teachers are often the first adults to notice when a child is struggling. A valuable workshop on Psychological First Aid, conducted by Ms. Anusha from Fortis Healthcare, focused on understanding students' emotional well-being and providing immediate emotional support during stressful situations.",
    "Teachers learned effective ways to identify signs of distress, such as withdrawal, sudden changes in behaviour, tearfulness or irritability. They practised communicating empathetically by listening without judgement, acknowledging feelings and offering reassurance, and discussed how to create a supportive classroom environment in which students feel safe to ask for help. Psychological first aid is not therapy; it is the calm, kind and practical first response that can make a difficult moment easier and ensure that a child is connected to further help if needed. The workshop was interactive, insightful and highly beneficial for all staff members.",

    "Mental well-being: a CBSE Capacity Building Programme",
    "A Teachers' Workshop on the topic 'Mental Well-being' was successfully conducted by the Central Board of Secondary Education as a Capacity Building Programme (CBP) on our campus. The session introduced teachers to creative teaching strategies, competency-based learning and effective classroom management techniques.",
    "Expert resource persons guided participants on modern assessment practices and meaningful student engagement methods. Through interactive activities and group discussions, the workshop was both informative and practical. The programme helped strengthen teachers' professional skills and deepened their understanding of the latest CBSE guidelines, supporting better learning outcomes for all students.",

    "Financial literacy for educators",
    "A Financial Literacy workshop was organised to strengthen teachers' understanding of personal finance and responsible money management. The session covered smart budgeting, saving, investing, financial planning and informed decision-making. It empowered educators with practical financial knowledge, and encouraged them to promote financial awareness among students.",
    "Financial literacy is increasingly seen as a core life skill. Students who understand the difference between needs and wants, who know how interest works and who can plan a simple budget are better equipped to make wise choices as adults. By learning first themselves, teachers are better able to weave these ideas into subjects such as mathematics, economics and life skills.",

    "A protective environment: child safety training",
    "Staff also took part in a workshop on child protection, gender equality and creating a safe, secure and healthy learning environment. The session highlighted the provisions of the POCSO Act, the importance of identifying and reporting concerns, and the role of educators in fostering care, respect, inclusion and empathy. The workshop reinforced the school's commitment to ensuring the safety, dignity and well-being of every child.",

    "Honoured by RIDS and UNESCO: the Teachers' Award Ceremony",
    "The hard work of our teachers has been recognised beyond the school. The teachers were proudly honoured in a grand Award Ceremony after receiving a prestigious recognition from RIDS (Recognition of International Dimension in Schools) and UNESCO, the United Nations Educational, Scientific and Cultural Organisation. The award celebrates their hard work, creative teaching ideas and dedication to helping every child grow and succeed.",
    "The ceremony was filled with happiness and applause as teachers were recognised for their contribution to shaping young minds. It was a proud moment for the school's facilitator community and inspired students and staff alike to continue aiming high and doing their very best each day. The recognition also reflects the school's commitment to bringing an international dimension into everyday learning, whether through peace education, global dialogues, sustainability projects or cultural exchange.",

    "What this means for students",
    "Parents may reasonably ask how all this training affects their children. The answer can be seen in the classroom. Teachers who understand learning outcomes plan lessons with clear goals, so students know what they are expected to learn and why. Teachers who use active learning strategies ask more open questions, set up group work and give students more chances to talk and think. Teachers trained in psychological first aid notice distress earlier and respond with care. Teachers who understand child safety create classrooms in which children feel protected. And teachers who feel valued and recognised bring more energy and warmth to their work.",
    "In short, investing in teachers is investing in children. Every hour a teacher spends learning is multiplied across the dozens of students they teach each day, and across the years in which those students remain at the school.",

    "A culture of reflection",
    "One of the most important outcomes of these workshops is a culture of reflection. Teachers are encouraged to keep a diary in which they record what they tried, what happened and what they would change. They share ideas in staff meetings, observe one another's lessons and ask for feedback. This willingness to examine one's own practice, to treat teaching as a craft that can always be improved, is the hallmark of a professional learning community.",
    "The school's leadership models this attitude. The Principal and Headmistresses lead workshops themselves, attend external training, and participate in national discussions such as the Education Summit. When teachers see their leaders learning, they are more willing to learn too.",

    "Looking ahead",
    "The professional development calendar for the rest of the session includes further training in assessment design, inclusive education, technology integration and student counselling, as well as peer-led sessions where teachers share strategies that have worked in their classrooms. The school will continue to invite external experts, partner with institutions such as CBSE, Fortis Healthcare and UNESCO-linked bodies, and give teachers time to apply what they learn.",
    "We congratulate our teachers on their recognition and thank them for their commitment. They are the reason our classrooms are places of curiosity, warmth and high expectations, and we are proud to celebrate them.",

    "Workshop highlights at a glance",
    "Learning Outcomes and Pedagogies (CBSE resource persons Ms. Mukta Mishra and Ms. Nishi Saxena). Active Learning Strategies (twenty strategies introduced by the Principal; every teacher to document one in the teacher's diary). Life Skills Basics (Headmistress Chhavi Ma'am). Psychological First Aid (Ms. Anusha, Fortis Healthcare). Mental Well-being Capacity Building Programme (CBSE). Financial Literacy for educators. Child protection and POCSO awareness. Teachers' Award Ceremony following the RIDS and UNESCO recognition.",
  ].join("\n\n"),
  published: true,
};

// ---------- Story 8: 08-sports-and-athletic-achievements.js ----------
const s08 = {
  title: "Champions on the Field, the Court and the Track: Sports Achievements at The Manthan School",
  slug: "sports-achievements-champions-field-court-track",
  category: "Achievement",
  date: new Date("2026-07-18T09:00:00.000Z"),
  imageKey: "sports",
  shortDescription:
    "From intra-class athletics and a two-day primary Sports Meet to a silver in inline skating, taekwondo medals, badminton and chess wins, our students have had a season to be proud of.",
  content: [
    "Sport teaches children things that no classroom can: how to lose with grace, how to win with humility, how to keep going when the finish line seems far away and how to rely on a team. At The Manthan School, sport is not a side activity but a core part of education, and this term our students have shown just how much they have learned. From intra-class athletics competitions to district-level taekwondo, from a skating marathon in Agra to badminton and chess victories, the school has much to celebrate.",

    "Intra-class athletics: where every child gets a chance to shine",
    "The Intra-Class Sports Competition gave students in Grades 6, 7 and 8 the chance to compete in track and field events including the 100 metre, 200 metre and 400 metre races, the hurdle race and the javelin throw, with separate sections for girls and boys. Competing within classes and houses, students represented teams named after historical figures and constellations, which added to the sense of belonging and friendly rivalry.",
    "In Grade 6, Aadhya Soni and Shreyansh Sharma took first place in the 100 metre race in the girls' and boys' sections respectively, with Shreyansh also winning the 200 metre race. Ananya Binwal won the girls' hurdle race, and Diva Gupta won the girls' javelin throw while Aditya Gupta won the boys' javelin. In Grade 8, Veronica and Siddhant Rajput won the 100 metre races, Vanya Verma and Aaradhya won the 200 metre events, Shreya Jain and Mrinank Sharma won the 400 metre races, and Navya Gupta, Ayush Kumar, Aradhana Dwivedi and Medhansh Biswas took top places in the hurdles and javelin.",
    "Every event also had second and third place winners, and every participant earned the respect of classmates for trying. The competition is designed so that each child can find an event that suits them, whether they are a sprinter, a jumper, a thrower or simply someone who loves to run.",

    "Two days of fitness: the Primary Sports Meet",
    "The school also organised a successful two-day Sports Meet for the Primary Section. It served as a vibrant platform for young learners to display their abilities across a wide range of activities, including indoor games, yoga, taekwondo, skating and track sprinting. Billed as a Fitness Fiesta, the event was thoughtfully designed to promote physical fitness, coordination and teamwork.",
    "Through active participation, children learned the values of discipline, perseverance and healthy competition. The event nurtured self-confidence and sportsmanship, encouraging students to perform to the best of their abilities while respecting their peers and teams. A separate sports event for students of Grades 3 to 5 added exciting races and fun-filled games and generated immense enthusiasm. Teachers coordinated smoothly and kept children motivated, and the event concluded on a joyful note.",

    "Excellence in motion: Aayat Tahir Khan at 'Run on Wheels 4.0'",
    "The school proudly congratulates Aayat Tahir Khan for her remarkable achievement at the 'Run on Wheels 4.0' Marathon held in Agra. She took part in the 5 km Inline Girls category and secured second position. Inline skating over such a distance demands stamina, balance and the ability to pace oneself, and Aayat's performance reflected months of dedicated training.",
    "Her success is a result of passion and commitment, and it brings pride to the school. We applaud her and encourage her to continue striving for greater heights. We wish her many more achievements in the years ahead.",

    "Taekwondo: medals at the 9th District Championship",
    "Our taekwondo athletes performed with distinction at the 9th District Taekwondo Championship 2026. Riddhi Joshi of Grade 9 won a gold medal, while Aayushman Tyagi of Grade 8 won a bronze. Other students, including Subhi Pant, Anvi Kumari and Anintika Singh, also earned medals in the same championship, and the school's results showed depth across age categories.",
    "Taekwondo teaches discipline, respect, focus and self-control. Students bow to opponents, follow strict rules and learn that technique matters more than force. Their instructors have praised the athletes' dedication to regular practice and their spirit of courtesy.",

    "Badminton: championships and doubles titles",
    "Grade 12 students Arnav Sharma and Atharv Kashyap had an outstanding run in badminton. Arnav won first place in the Badminton Championship (U-17) at the Sedra Cup. At the PEFI Khel Mohotsav, the pair won the U-17 Boys' Doubles title. They also took the first prize in the Badminton Promethesis competition. Their consistency across tournaments shows both talent and teamwork.",
    "In a younger age group, Manas Negi won second position in the U-14 badminton category, adding to the school's growing strength in racket sports.",

    "Chess, football and other triumphs",
    "Our students have excelled in the mind sports as well. Grade 8 students Swayam Chhabra and Medhansh Biswas placed among the winners in the 2026 Chess U-15 Boys competition. In football, our boys also took part in the U-16 tournament at Mayoor School, Noida, gaining valuable match experience against strong teams. Elsewhere, Yashasvi Chandra of Grade 9 earned a certificate and trophy at an international speed cubing tournament, showing the same patience and pattern recognition that serve chess players well.",
    "Sampurna Sharma and Vidushi Taliwal of Grade 9 won third place at Toyotsava 2026, and Veronica and Ambika of Grade 8 won third position in an online Sanskrit and German competition. Although the last result is not a sporting event, it reminds us that competition at the school extends across languages, arts and sciences.",

    "What sport gives our students",
    "Teachers and coaches describe several benefits they see in students who take part in sport. Physical fitness is the obvious one, but the effects on learning are just as important. Regular exercise improves concentration, memory and mood. Team sports build communication and leadership. Individual sports build resilience and self-motivation. All sports teach children to set goals, practise patiently and respond constructively to defeat.",
    "Coaches also emphasise that not every child will become a champion, and that is perfectly fine. The aim is for every child to enjoy movement, to build healthy habits for life and to feel part of something. That is why the school offers a wide range of activities, from athletics and yoga to skating, taekwondo, badminton, football and chess.",

    "House spirit and team belonging",
    "Athletics events at the school are organised around houses, and the names of these houses, drawn from historical figures and constellations, give students a sense of identity. Cheering for one's house, wearing its colours and earning points for it teach children that they are part of something larger than themselves. Students learn to celebrate a teammate's success, to console one who has stumbled, and to accept results gracefully. These lessons in belonging and sportsmanship are among the most valuable that school sport offers.",
    "House captains and prefects have a special responsibility: they organise practice sessions, encourage reluctant classmates to take part and set an example in behaviour. Many of the school's future leaders discover their abilities in these roles.",

    "Advice for young athletes",
    "Coaches shared a few simple pieces of advice for students who wish to follow in the footsteps of this term's medal winners. Begin with fun: choose an activity you enjoy and play it regularly. Practise consistently in short sessions rather than occasionally for long ones. Warm up and cool down every time. Eat a balanced diet and drink enough water. Sleep well. Watch more experienced players and ask them questions. Treat every loss as a lesson and every win as a chance to thank those who helped. And remember that being a good teammate is as important as being a good competitor.",

    "Balancing sport and study",
    "Parents sometimes worry that time spent on sport will hurt academic performance. The experience of our students suggests otherwise. Many of the school's best athletes are also strong students, and their results show that discipline in one area supports discipline in the other. The key is planning: students are encouraged to maintain a timetable, to complete homework regularly and to rest properly. Teachers coordinate with coaches so that major competitions and examinations do not clash.",
    "The school also reminds students that overtraining is a risk. Rest, nutrition, hydration and proper warm-ups are part of every sports session, and students are taught to listen to their bodies.",

    "Yoga: strength for body and mind",
    "No account of sport at the school would be complete without yoga. Daily yoga practice supports flexibility, balance and calm. It is a natural brain booster that improves mental clarity, sharpens memory and enhances attention, helping students focus better on their studies. Regular practice also reduces academic anxiety, teaches emotional balance and builds self-confidence. As the saying goes, a healthy mind resides in a healthy body, and our students learn this from an early age.",

    "A word of thanks",
    "We thank our physical education teachers and coaches, whose patience and expertise make these achievements possible. We thank the parents who bring their children to practice, cheer from the sidelines and offer encouragement after both wins and losses. We thank the organisers of tournaments for providing opportunities, and we thank the students themselves, who give their best day after day.",
    "Congratulations to every athlete, medal winner and participant. Whether you stood on a podium or finished at the back of the field, you made the school proud by showing up, trying hard and respecting others.",

    "Highlights at a glance",
    "Intra-class athletics for Grades 6 to 8 (100 m, 200 m, 400 m, hurdles, javelin). Two-day Primary Sports Meet and Grades 3 to 5 sports event. Aayat Tahir Khan: second place, 5 km Inline Girls, Run on Wheels 4.0. Riddhi Joshi: gold, Aayushman Tyagi: bronze, 9th District Taekwondo Championship. Arnav Sharma and Atharv Kashyap: badminton U-17 and doubles titles. Manas Negi: second, U-14 badminton. Chess U-15 winners from Grade 8. Yashasvi Chandra: international speed cubing certificate and trophy.",
  ].join("\n\n"),
  published: true,
};

// ---------- Story 9: 09-science-innovation-exposure.js ----------
const s09 = {
  title: "From IIT Delhi to NPL: Science, Innovation and Real-World Exposure for Our Senior Students",
  slug: "iit-delhi-npl-science-innovation-exposure",
  category: "Event",
  date: new Date("2026-07-20T09:00:00.000Z"),
  imageKey: "scienceVisits",
  shortDescription:
    "Students explored lasers at IIT Delhi, metrology at CSIR-NPL, an inclusive bootcamp at Antah, the Harappan Reimagined art challenge, EDGE 2026 Maths and summer internships.",
  content: [
    "Curiosity is the engine of learning, and the best way to feed curiosity is to take students to places where questions are being asked every day. In recent months, students and faculty of The Manthan School have visited some of the country's leading scientific institutions, taken part in inter-school competitions, joined an inclusive-education bootcamp, reimagined an ancient civilisation through art and spent their summer vacations in internships. This story gathers those experiences, which together show how the school connects classroom knowledge to the wider world.",

    "Light, Lasers and Lifesavers at IIT Delhi",
    "On 18 April 2026, students attended an exciting science session titled 'Light, Lasers, and Lifesavers: Building Sensors That See the Invisible' at IIT Delhi. The session explored how light and lasers are used in medical diagnostics, environmental monitoring and modern sensing technologies.",
    "For students who study optics and waves in their textbooks, seeing how these ideas are applied was a revelation. They learned that sensors can detect minute changes in light to identify disease markers, measure pollutants in the air or monitor the structural health of bridges. The session showed that the same physics that explains how a rainbow forms can be used to save lives.",
    "It also gave students a glimpse of university research. They saw laboratory equipment, heard researchers talk about their work and learned that science involves trial, error and perseverance as much as brilliance. Many returned to school with new questions and, for some, a new ambition to study engineering or physics.",

    "A day at CSIR-National Physical Laboratory",
    "On 20 May 2026, students and faculty visited the CSIR-National Physical Laboratory (NPL) for a special workshop celebrating World Metrology Day, National Technology Day, World Environment Day and World Intellectual Property Day. The visit offered valuable exposure to scientific research and innovation through interactive sessions on several topics.",
    "Metrology and SI units: students learned that measurement is the foundation of science and trade. They discovered how standards for the metre, kilogram and second are defined and maintained, and why a world without agreed units of measurement would make science, industry and commerce impossible. For students accustomed to taking a ruler or balance for granted, this was an eye-opening look at the effort behind every reading.",
    "Recycling and upcycling: sessions highlighted how waste can be transformed into useful products, supporting the message of environmental responsibility that runs through the school's curriculum.",
    "Solar energy: students explored how sunlight is converted to electricity and discussed the role of solar power in meeting India's energy needs.",
    "Single-crystal crystallisation: students watched how crystals grow from solutions, a fascinating demonstration of patience and precision that links chemistry, physics and materials science.",
    "The workshop's combination of themes, from measurement to environment to intellectual property, helped students understand that science does not exist in isolation. It is connected to economy, law, sustainability and society.",

    "Prismatic: a platform for creativity and critical thinking",
    "Students enthusiastically took part in Prismatic, an engaging platform that nurtures creativity, innovation, collaboration and critical thinking. Through a variety of interactive activities and hands-on learning experiences, they explored new ideas, showcased their talents and developed essential twenty-first century skills.",
    "The programme encouraged curiosity, teamwork and problem-solving while inspiring students to think beyond the classroom. As with other skill-based events at the school, the value lay not only in the outcome but in the process: brainstorming, testing ideas, listening to feedback and refining work.",

    "EDGE 2026 Maths: beyond numbers",
    "An exciting inter-school mathematics event, EDGE 2026, brought together talented young minds from various schools under the theme 'Beyond numbers lies the power to imagine, innovate, and achieve'. Students participated in a rich variety of competitions: Mathematical Quiz, Sudoku, KenKen, Mathematical Relay, Comic Strip, Memes and Recreational Board Games.",
    "The range of events demonstrates that mathematics is more than calculation. Logic puzzles such as Sudoku and KenKen reward patience and deduction. The relay encouraged teamwork and speed. Comic strips and memes asked students to explain mathematical ideas with humour and creativity. Recreational board games revealed strategy and probability in play. Participants demonstrated exceptional reasoning abilities, teamwork and a passion for mathematics, and visiting students mingled with hosts in a spirit of friendly competition.",

    "Inclusive Duniya Bootcamp at Antah",
    "Students participated in the Inclusive Duniya Bootcamp at Antah: Prerna, The New Age School. The experience proved both enriching and engaging, offering exposure to a progressive and inclusive learning environment. The session featured interactive activities centred on inclusion, empathy and collaboration.",
    "The thoughtfully curated tasks helped students gain a deeper understanding of diversity and the importance of building inclusive spaces within communities. They considered how a classroom, a playground or a workplace might be redesigned so that everyone can participate, and they reflected on their own habits and assumptions. For many students it was a first chance to think seriously about accessibility and belonging, and they returned with ideas they hope to apply in their own school.",

    "Harappan Reimagined: where art meets ancient history",
    "Students showcased their creativity and historical understanding in the Harappan Reimagined Competition. The challenge was to design a unique Harappan seal that blended the traditional Lippan art of Gujarat with the rich heritage of the Indus Valley Civilisation.",
    "Harappan seals, with their animals, symbols and still-undeciphered script, are among the most intriguing artefacts of the ancient world. Lippan art, a traditional craft from Kutch in Gujarat, uses clay and mirror work to create intricate patterns on walls. Combining the two required students to research motifs, understand craftsmanship and invent a contemporary style that honoured both traditions. Through this fusion of art and history, students explored ancient symbols, motifs and techniques, and expressed them in fresh ways.",

    "Summer internships: first steps into careers",
    "During the summer vacations, students took part in a variety of internship programmes that offered exciting and valuable exposure to higher education and emerging career opportunities. They explored diverse fields through internships at DME College (Noida), Pearl Academy (fashion design) and AI for All, gaining practical experience and guidance from industry experts.",
    "These internships enabled students to develop essential skills such as designing fabrics, communication, creativity, media, problem-solving and the fundamentals of technology and artificial intelligence. They also helped students test their interests. A student who thinks she wants to study fashion may discover through an internship what the work involves day to day, and one interested in artificial intelligence may learn what skills she needs to build. Such early exposure helps young people make informed decisions about their subjects and careers.",

    "Learning that connects",
    "Taken together, these experiences illustrate a philosophy: learning is richest when it connects. At IIT Delhi and NPL, classroom science met real laboratories. At EDGE, mathematics met creativity and teamwork. At Antah, social awareness met empathy. In the Harappan competition, history met art. In internships, school subjects met the working world.",
    "Teachers observe that students who participate in such experiences return to class with greater motivation. They ask better questions, make links between subjects, and approach assignments with a stronger sense of purpose. The school will therefore continue to arrange visits, partnerships and competitions throughout the year.",

    "Reflections from the students",
    "After each experience, students were asked to write reflections, and the most common theme was surprise: surprise that a laboratory could be so quiet and so absorbing, surprise at the number of careers that exist, and surprise at how much there is still to learn. Teachers encourage students to keep a journal of questions that arise from such visits and to pursue them through reading, projects and conversations with mentors.",
    "A few students have already begun planning projects inspired by their visits, such as a low-cost air-quality monitor, a recycling initiative and a puzzle club. The school will support them with guidance and resources.",

    "How families can help",
    "Families can extend these experiences at home by encouraging children to share what they learned, visiting science centres and museums together, watching documentaries, solving puzzles as a family and discussing careers. Parents who work in science, technology, design or other fields are welcome to speak to students at school; their stories can be as inspiring as any visit.",

    "Thank you",
    "The school extends its heartfelt thanks to the faculty and organisers at IIT Delhi and CSIR-NPL, to the hosts at Antah: Prerna, to the organisers of EDGE 2026 and the Harappan Reimagined Competition, and to the institutions that welcomed our interns. We also thank our teachers for accompanying students, and parents for their support.",
    "Most of all, we thank the students for being inquisitive, courteous and enthusiastic ambassadors of the school wherever they go.",

    "Quick reference",
    "IIT Delhi: 'Light, Lasers, and Lifesavers' session on 18 April 2026. CSIR-NPL: workshop on 20 May 2026 covering metrology, recycling and upcycling, solar energy and crystallisation. EDGE 2026 Maths: quiz, Sudoku, KenKen, relay, comic strip, memes and board games. Inclusive Duniya Bootcamp at Antah: Prerna. Harappan Reimagined: Harappan seals blended with Lippan art. Internships: DME College, Pearl Academy and AI for All.",
  ].join("\n\n"),
  published: true,
};

// ---------- Story 10: 10-grade5-experiences-unesco-awards.js ----------
const s10 = {
  title: "Grade 5 Adventures and a UNESCO Honour: Traffic Park, Scouts and Guides, Picnic and Sustainability Awards",
  slug: "grade-5-adventures-unesco-sustainability-awards",
  category: "Achievement",
  date: new Date("2026-07-22T09:00:00.000Z"),
  imageKey: "grade5",
  shortDescription:
    "Our upper primary learners studied road safety at Traffic Park, camped with Scouts and Guides, sang at a Chinmaya Mission programme and enjoyed an adventure picnic, while the school earned UNESCO-linked sustainability awards.",
  content: [
    "The upper primary years are a special time. Children are old enough to take on responsibility and young enough to be thrilled by a zipline. Over the last session, our Grade 5 students and their schoolmates in Grades 3 and 4 have had a series of experiences that combined fun, safety, service and culture. They visited the Traffic Park to learn about road safety, attended a Scouts and Guides camp, took part in a health awareness workshop, performed at a Chinmaya Mission programme and ended the year with an adventure picnic. Meanwhile, the school's students were honoured with UNESCO-linked awards for their commitment to sustainability. This is the story of those experiences.",

    "Learning road safety at the Traffic Park",
    "Grade 5 students visited the Traffic Park in Noida as part of an educational programme on road safety and civic responsibility. The visit aimed to create awareness about traffic rules and responsible behaviour on the roads.",
    "The Traffic Chief welcomed the students and explained traffic symbols, signals and road markings. He emphasised the importance of wearing helmets and seat belts and of following pedestrian rules such as using zebra crossings and looking both ways. Children learned why each sign has its particular shape and colour and what drivers expect from pedestrians.",
    "A practical session gave students hands-on experience of real-life traffic situations. They took turns role-playing as pedestrians, drivers and traffic managers, which helped them understand the viewpoint of each. Playing the traffic manager, in particular, taught them how much concentration and patience the job demands. The activity highlighted the value of discipline, cooperation and respect for traffic personnel.",
    "Road safety is a matter of life and death, and the habits children form now will stay with them. Parents can reinforce the lessons by always wearing seat belts, insisting on helmets for two-wheeler rides and setting a good example when crossing roads.",

    "Scouts and Guides Camp: discipline, teamwork and leadership",
    "A Scouts and Guides Camp was organised for Grade 5 students within the school premises. The camp aimed to instil discipline, teamwork, leadership qualities and a strong sense of responsibility.",
    "Over two days, students actively participated in drills, knot-tying, first aid training and team-building games. Informative sessions on cleanliness, personal hygiene and community service reinforced the values of good citizenship. Various outdoor and group activities further enhanced their confidence, cooperation and problem-solving abilities.",
    "Knot-tying may seem old-fashioned, but it is a wonderful way to teach attention to detail, patience and the satisfaction of mastering a skill. First aid training equipped children with practical knowledge about how to respond to minor injuries and when to call an adult. Team-building games asked them to solve problems together, which revealed strengths in children who do not usually take the lead.",
    "The camp was both enriching and memorable, contributing meaningfully to the holistic personality development of the students.",

    "A health awareness workshop for girls",
    "A menstrual health awareness workshop was conducted for Grade 4 and 5 girls to educate them about puberty and personal hygiene. The session highlighted the physical and emotional changes that occur during adolescence and emphasised the importance of maintaining proper hygiene during menstruation.",
    "Students were guided on the safe and appropriate use of sanitary products. The interactive discussion addressed common myths and encouraged openness, helping students feel informed, confident and well prepared. Conducting such sessions in a sensitive, age-appropriate way ensures that girls do not feel embarrassed or frightened by a natural process, and that they know whom to ask for help. The school works closely with parents on this topic and welcomes questions.",

    "Chinmaya Mission programme: song, culture and values",
    "Our students enthusiastically participated in a programme organised by Chinmaya Mission, founded by Swami Chinmayananda. The mission is dedicated to promoting spiritual knowledge, Indian culture and moral values, particularly among young people.",
    "During the event, our students confidently presented a melodious song, which was warmly appreciated by the audience. The programme was enriching and inspiring, providing students with valuable stage exposure and reinforcing the importance of cultural and spiritual values. Performing in front of an unfamiliar audience also built confidence, and the children returned excited to take part in more such events.",

    "Adventure at the school picnic",
    "At the end of the academic session, students of Grades 3 to 5 went on an exciting picnic to Victory Adventure Park. The trip celebrated the completion of the session and gave students a refreshing break from their studies.",
    "The children enthusiastically took part in adventure activities such as the zipline, rock climbing, Burma bridge, rappelling, hiking and a tractor ride. They enjoyed spending time with friends and teachers in a lively outdoor environment. Teachers carefully supervised all activities and ensured the safety of every student. Facing a challenge that feels a little frightening, and getting through it with encouragement from friends and teachers, is one of the most valuable experiences a child can have.",
    "The picnic created joyful moments and strengthened the bond among students. It was a memorable and enjoyable day for everyone.",

    "UNESCO Youth Innovation: honoured for sustainability",
    "The International Centre for UNESCO (ICU) successfully organised a campaign in 2025 under the theme 'Be an Explorer, Protect our Planet', focusing on environmental and cultural sustainability. The campaign was designed to support the implementation of the United Nations Sustainable Development Goals, to deepen awareness, to promote STEAM education and to empower young minds to contribute meaningful ideas and solutions for a better tomorrow.",
    "Participants worldwide were encouraged to draw inspiration from their daily experiences and to explore related themes creatively. Our students were proudly recognised for their outstanding commitment to environmental responsibility and sustainable practices. They were conferred with the Award for Pioneering Sustainability and the Green Impact Award in appreciation of their innovative ideas and meaningful contributions towards protecting the planet.",
    "These accolades reflect the dedication, creativity and collaborative spirit of the young learners. They also reflect a school culture in which sustainability is not an occasional topic but a daily habit: students segregate waste, reduce water use, grow plants, create posters and participate in Earth Day assemblies built around the Three Rs of Reduce, Reuse and Recycle. The school community congratulates all award recipients on this commendable achievement.",

    "Mindbox Championship success",
    "Riyaan Ghosh of Grade 5 (Banyan house) and Anubhi Gupta of Grade 3 (Alps house) achieved great success at the Mindbox Championship. Their creativity and skills brought pride to the school, and the school congratulates these young achievers.",

    "Why experiences matter in the upper primary years",
    "Educators often describe the upper primary years as a bridge between early childhood and adolescence. Children begin to think more abstractly, form deeper friendships and ask larger questions about the world. They need opportunities to practise independence in safe settings, to try new roles and to see themselves as capable. Experiences such as the Scouts and Guides camp, the Traffic Park visit and the adventure picnic provide exactly that.",
    "They also build social skills. Working in teams, sharing tents, taking turns on a climbing wall or role-playing a traffic situation all call for cooperation and respect. And they build character: courage when facing a challenge, responsibility when entrusted with a task, and empathy when a friend needs help.",

    "Looking back on a full year",
    "Taken as a whole, the year for our upper primary students has been full and varied. They have learned in classrooms, in parks, in a camp, on a stage and on an adventure course. They have studied rules and broken records of their own personal limits. They have been recognised for creativity, sustainability and skill. Along the way, teachers have seen them grow in confidence, empathy and independence.",
    "The school's aim is for every child to leave the primary years not only with strong foundations in literacy and numeracy but with the habits of a good citizen: someone who follows rules because they understand why they matter, who works well with others, who cares for the environment and who has the courage to try new things. Experiences such as these are how that aim is achieved.",

    "Encouraging every child to take part",
    "Not every child is equally eager to join a camp, perform on stage or climb a wall, and that is perfectly natural. Teachers take care to encourage rather than pressure, to offer different roles so that each child can contribute in a way that suits them, and to celebrate small steps. A child who begins by holding a rope for a friend may later volunteer to climb; one who joins the chorus may later sing a solo. Patience and gentle encouragement are at the heart of the school's approach, and parents are welcome to talk with teachers if their child needs extra support in building confidence.",

    "Safety first",
    "The school treats safety as a precondition for every outing. Teachers conduct risk assessments, brief students on rules, maintain appropriate supervision ratios, carry first-aid kits and keep parents informed. Students are taught to follow instructions, stay with their groups and report any concern. Adventure activities are performed under trained instructors using proper equipment. These routines ensure that children can enjoy adventure with confidence.",

    "How parents can follow up",
    "Parents can reinforce the lessons by talking with children about what they learned. Ask your child to teach you three traffic signs. Practise a basic first aid skill together, such as cleaning a small cut. Encourage them to write about their favourite part of the picnic. Support their involvement in community service and cultural activities. And celebrate their courage in trying new things, whether or not they succeeded at first.",

    "Gratitude",
    "We thank the Traffic Park team, the Scouts and Guides trainers, the Chinmaya Mission organisers, the staff of Victory Adventure Park, the resource persons who conducted the health workshop, and the International Centre for UNESCO for recognising our students. We also thank our teachers for their care and our parents for their trust. Most of all, congratulations to our young learners for their curiosity, courage and kindness.",
  ].join("\n\n"),
  published: true,
};

const stories = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10];

const newsEvents = stories.map(({ imageKey, ...story }, i) => ({
  ...story,
  image: IMG[imageKey] || FALLBACK[i % FALLBACK.length],
}));

async function seedNewsEvents() {
  let inserted = 0;
  let updated = 0;
  for (const item of newsEvents) {
    // Upsert by slug: safe to re-run, refreshes content and images.
    const result = await NewsEvent.updateOne(
      { slug: item.slug },
      { $set: item },
      { upsert: true, runValidators: true },
    );
    if (result.upsertedCount) inserted += 1;
    else if (result.modifiedCount) updated += 1;
  }
  return { inserted, updated };
}

try {
  await connectDB();
  const { inserted, updated } = await seedNewsEvents();
  console.log(`News & events seeded: ${inserted} inserted, ${updated} updated.`);
} catch (err) {
  console.error("Seeding failed:", err);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}