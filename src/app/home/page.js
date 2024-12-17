"use client";
import React, { useState } from "react";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";

const LearningPage = () => {
  const [activeIndex, setActiveIndex] = useState({ heading: null, subheading: null, chapter: null });

  const toggleActiveIndex = (level, index) => {
    setActiveIndex((prev) => {
      const newState = { ...prev };

      // If toggling a heading, close all subheadings and chapters under it
      if (level === "heading") {
        if (prev.heading === index) {
          newState.heading = null;
          newState.subheading = null;
          newState.chapter = null;
        } else {
          newState.heading = index;
          // Close other subheadings and chapters
          newState.subheading = null;
          newState.chapter = null;
        }
      } else if (level === "subheading") {
        if (prev.subheading === index) {
          newState.subheading = null;
          newState.chapter = null;
        } else {
          newState.subheading = index;
          newState.chapter = null;
        }
      } else {
        newState.chapter = prev.chapter === index ? null : index;
      }
      return newState;
    });
  };


  const handleGoBackToHeadings = () => {
    setActiveIndex((prev) => ({ ...prev, heading: null, subheading: null, chapter: null }));
  }

  const handleGoBackToSubheadings = () => {
    setActiveIndex((prev) => ({ ...prev, subheading: null, chapter: null }));
  }


  const Headings1 = ["Five Pillars of Islam", "Six Articles of Faith"];
  const Subheadings1 = [
    ["Shahada: Declaration of Faith", "Salah: The Pillar of Prayer", "Zakat: The Pillar of Charity", "Sawm: The Pillar of Fasting", "Hajj: The Pilgrimage to Mecca"],
    ["Allah", "Messengers of God", "Divinely revealed books", "Angels", "Day of Judgment", "DIVINE DECREE"],
  ];
  const chapterName1 = [
    ["Who is Allah?", "Is Allah one & indivisible?", "What is Tawhid?", "How many names are there for Allah Almighty?"],
    ["How many Prophets have been mentioned in holy Quran?", "Who is the last Prophet?", "Who are the prioritized among all prophets (Ulul Azm)?", "Were the Prophets in Islam actual human beings?"],
    ["What are the Holy Books in Islam?", "Which is the only remaining holy book in its original form?", "To which prophet was the Injil revealed?", "Which is the holy book revealed to Musa?"],
    ["Who are the angels (mala'ika) in Islam?", "How many angels are there in Islam?", "Who brought Allah’s revelations to the prophets?", "Who is The Angel of Death?", "Can angels appear in human form?"],
    ["What is the Day of Judgment?", "When will the Day of Judgment occur?", "Who will be rewarded paradise?", "Who will be rewarded hell?", "Who will be rewarded paradise?"],
    ["What is the Arabic word for Divine Decree?", "What is belief in the Divine Decree (Qadar) in Islam?", "Does believing in Divine Decree mean that humans have no free will?"]
  ];

  const chapterName2 = [
    ["What is Shahada in Islam?", "Does saying the Shahada mean a person is committed to following Allah’s teachings?"],
    ["What is Salah in Islam?", "Why is praying five times a day so essential in Islam?", "What happens during Salah? What are the actions involved?"],
    ["What is Zakat in Islam?", "How does Zakat work? What are the criteria for giving Zakat, and who benefits from it?", "So, Zakat helps to prevent wealth from concentrating in a few hands, right?"],
    ["What is Sawm in Islam?", "What does fasting during Ramadan involve? Is it just about not eating?", "So fasting is about more than just hunger and thirst, right?"],
    ["What is Hajj in Islam?", "What makes Hajj so special?", "What do Muslims do during Hajj?", "When does Hajj take place?"]
  ];

  const chapterContent1 = [
    ["He is the creator of universe, sovereign and all-powerful", "Yes, belief in oneness of Allah is fundamental", "It means Allah is singular, unique and without any partners", "99 names"],
    ["25", "Prophet Muhammed (PBUH)", "Naoh, Ibrahim, Musa, Isa, Muhammed", "The prophets were real human beings chosen by Allah to deliver His messages to mankind."],
    ["Quran, Tawrat, Zabur, Injil", "The Quran", "Prophet Jesus", "Tawrat"],
    ["They are beings created by Allah from light. They are invisible to humans but have specific roles and duties.", "The exact number of angels is not known.", "Jibreel", "Azrael", "Yes, angels can take on human form."],
    ["Day when Allah will resurrect all beings to account for their deeds", "The exact time of the Day of Judgment is known only to Allah", "Those who have lived righteous lives", "those who have led sinful lives"],
    ["Qadar", "Belief in Qadar is the belief that everything that happens, both good and bad, is predestined by Allah. It is part of the six articles of faith in Islam.", "No, Islam teaches that while Allah has knowledge and control over everything, humans are still accountable for their actions, as they have been given free will to choose between right and wrong."]
  ];

  const chapterContent2 = [
    ["Shahada is the declaration of faith, where a Muslim says, “There is no god but Allah, and Muhammad is His Messenger.” This is the core belief of Islam.", "Yes, saying the Shahada is a commitment to following Allah’s guidance and the teachings of Prophet Muhammad. It is the foundation of the entire Islamic faith."],
    ["Salah is the second pillar of Islam and refers to the five daily prayers performed by Muslims at specific times throughout the day", "Salah helps Muslims maintain a direct connection with Allah, stay spiritually grounded, seek guidance, express gratitude, and remember Allah’s presence throughout the day. It’s a daily anchor for faith and discipline.", "During Salah, Muslims face the Kaaba in Mecca, recite verses from the Quran, and perform physical actions like standing, bowing, and prostrating. Each action reflects submission to Allah and has spiritual significance."],
    ["Zakat is the third pillar of Islam, which means 'to purify.' It is a mandatory act of charity that purifies a Muslim’s wealth and soul by redistributing a portion of it to those in need.", "Muslims are required to give 2.5% of their wealth annually if it exceeds a certain threshold known as nisab (equal to the value of 85 grams of gold or 595 grams of silver). Zakat is given to specific categories of people, such as the poor, the needy, those in debt, and others as outlined in the Quran.", "Yes, exactly! Zakat not only helps uplift those in need but also ensures wealth circulates within society, purifies both wealth and the soul, promotes empathy, and strengthens community bonds."],
    ["Sawm is the fourth pillar of Islam, which refers to fasting during the holy month of Ramadan. Muslims fast from dawn to sunset, refraining from food, drink, and other physical needs.", "Fasting is more than just abstaining from food and drink. It also includes avoiding smoking, negative habits like arguing, and impure thoughts. Muslims also make an intention (niyyah) before dawn to fast for the sake of Allah.", "Exactly! Fasting purifies both the body and soul. It strengthens a person’s connection with Allah, teaches patience, empathy, gratitude, and provides time for self-reflection, spiritual growth, and helping those in need."],
    ["Hajj is the fifth and final pillar of Islam, a once-in-a-lifetime pilgrimage to Mecca for Muslims who are physically and financially able to perform it.", "Hajj is the largest spiritual gathering of Muslims worldwide. Pilgrims come together to worship Allah and perform rituals that were taught by Prophet Muhammad during his last pilgrimage.", "During Hajj, pilgrims wear simple white clothing called Ihram, which symbolizes unity and equality. They perform a series of rituals such as circling the Ka’ba, standing at Arafat, and other acts of devotion to strengthen their faith.", "Hajj occurs during Dhul Hijjah, the 12th month of the Islamic calendar. It ends with the festival of Eid ul-Adha, which commemorates the devotion of Prophet Ibrahim to Allah."]
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">PATH</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center ml-6">
          Beginner
          <Star className="ml-2 text-yellow-500" size={24} />
        </h2>
      </div>
      <div className="w-full  mx-auto py-6">
        {/* Main Content Area - Now takes full width */}
        <main className="w-full px-6">
          {/* Breadcrumbs */}
          <div className="mb-4 flex items-center">
            {activeIndex.heading !== null && (
              <>
                <button onClick={handleGoBackToHeadings} className="mr-2 p-1 rounded-full hover:bg-gray-700 transition-colors"><ArrowLeft size={20} /></button>
                <span className="font-semibold text-gray-300 mr-2">{Headings1[activeIndex.heading]}</span>
                {activeIndex.subheading !== null && (
                  <>
                    <span className="text-gray-500 mr-2">/</span>
                    <button onClick={handleGoBackToSubheadings} className="mr-2 p-1 rounded-full hover:bg-gray-700 transition-colors"><ArrowLeft size={20} /></button>
                    <span className="font-semibold text-gray-300 mr-2">{Subheadings1[activeIndex.heading][activeIndex.subheading]}</span>
                    {activeIndex.chapter !== null && (
                      <>
                        <span className="text-gray-500 mr-2">/</span>
                        <span className="font-semibold text-gray-300">{(activeIndex.heading === 0 ? chapterName2 : chapterName1)[activeIndex.subheading][activeIndex.chapter]}</span>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          {/* Headings, Subheadings, and Chapters - Rendered conditionally */}
          {activeIndex.heading === null && (
            <div className="space-y-4">
              {Headings1.map((heading, headingIndex) => (
                <div
                  key={headingIndex}
                  className={`rounded-lg p-4 transition-all flex items-center justify-between  bg-gray-800 hover:bg-gray-700 cursor-pointer  `}
                  onClick={() => toggleActiveIndex("heading", headingIndex)}
                >

                  <span className={`font-semibold uppercase ${activeIndex.heading === headingIndex ? "text-white" : "text-gray-300"}  `}>{heading}</span>
                  <button
                    className={`text-green-500  p-2 rounded-full transition-all duration-500   ${activeIndex.heading === headingIndex ? "rotate-90" : ""
                      }`}
                  >
                    <ArrowRight size={32} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeIndex.heading !== null && activeIndex.subheading === null && (
            <div className="space-y-4">
              {Subheadings1[activeIndex.heading]?.map((subheading, subheadingIndex) => (
                <div
                  key={`${activeIndex.heading}-${subheadingIndex}`}
                  className={`rounded-lg p-4 transition-all flex items-center justify-between bg-gray-700 hover:bg-gray-600  cursor-pointer  `}
                  onClick={() => toggleActiveIndex("subheading", subheadingIndex)}
                >
                  <span className={`font-semibold uppercase ${activeIndex.subheading === subheadingIndex ? "text-white" : "text-gray-300"} `}>{subheading}</span>
                  <button
                    className={`text-green-500 p-2 rounded-full transition-all duration-500  ${activeIndex.subheading === subheadingIndex ? "rotate-90" : ""
                      }`}
                  >
                    <ArrowRight size={32} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {activeIndex.heading !== null && activeIndex.subheading !== null && (
            <div className=" space-y-4">
              {(activeIndex.heading === 0 ? chapterName2 : chapterName1)[activeIndex.subheading]?.map((chapter, chapterIndex) => (
                <div key={`${activeIndex.subheading}-${chapterIndex}`}>
                  {/* Chapter */}
                  <div
                    className={`rounded-lg p-4 transition-all flex items-center justify-between bg-gray-600 hover:bg-gray-500 cursor-pointer ${activeIndex.chapter === chapterIndex ? "bg-gray-500" : "bg-gray-600"}`}
                    onClick={() => toggleActiveIndex("chapter", chapterIndex)}
                  >
                    <span className={`font-semibold ${activeIndex.chapter === chapterIndex ? "text-white" : "text-gray-300"}`}>{chapter}</span>
                    <button
                      className={`text-green-500  p-2 rounded-full transition-all duration-500 ${activeIndex.chapter === chapterIndex ? "rotate-90" : ""
                        }`}
                    >
                      <ArrowRight size={32} />
                    </button>
                  </div>

                  {activeIndex.chapter === chapterIndex && (
                    <div className="p-4 bg-gray-800 my-4 w-full rounded-xl text-white font-serif text-lg md:text-2xl leading-snug shadow-lg">
                      <p className="my-4">
                        {(activeIndex.heading === 0 ? chapterContent2 : chapterContent1)[activeIndex.subheading]?.[chapterIndex] ||
                          "No content available"}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </>
  );
};

export default LearningPage;