const challenges = [
  {
    id: 1,
    caseTitle: "The State v. Rohan Mehta",
    difficulty: "Intermediate",
    category: "Criminal Law",
    scenario:
      "A person is found dead inside a private residence. Investigators discover fingerprints belonging to the accused on a glass near the scene. The accused admits being present at the residence earlier that evening but denies committing the killing.",
    question:
      "Which piece of information would be most important for establishing whether the accused was responsible for the death?",
    options: [
      "The accused had previously visited the residence.",
      "The accused's fingerprints were found on the glass.",
      "Evidence establishing the accused's presence at the time of the killing.",
      "The accused knew the victim.",
    ],
    answer: 2,
    explanation:
      "Presence at or around the time of the offence, supported by reliable evidence, is generally more significant than evidence merely showing that the accused had previously been at the location or knew the victim.",
  },
  {
    id: 2,
    caseTitle: "The State v. Arjun Sharma",
    difficulty: "Advanced",
    category: "Evidence",
    scenario:
      "A prosecution witness claims to have seen the accused leaving the scene. During cross-examination, the witness acknowledges that the incident occurred at night and that the area had poor lighting.",
    question:
      "What issue should the court examine most closely when evaluating this testimony?",
    options: [
      "The witness's occupation.",
      "The reliability of the witness's identification.",
      "Whether the accused knew the witness.",
      "The weather earlier that day.",
    ],
    answer: 1,
    explanation:
      "The conditions under which an identification was made can directly affect its reliability. Poor lighting and limited visibility are therefore important considerations.",
  },
  {
    id: 3,
    caseTitle: "The State v. Priya Kapoor",
    difficulty: "Beginner",
    category: "Criminal Procedure",
    scenario:
      "Police arrest a suspect in connection with a serious offence. The suspect is questioned and provides information that investigators later attempt to use during the proceedings.",
    question:
      "Why is the manner in which evidence is obtained important in criminal proceedings?",
    options: [
      "Because every piece of evidence is automatically accepted.",
      "Because procedural safeguards can affect whether evidence may be relied upon.",
      "Because witnesses cannot be questioned.",
      "Because only physical evidence can be presented.",
    ],
    answer: 1,
    explanation:
      "Criminal proceedings include procedural safeguards designed to protect fairness. The circumstances in which evidence is obtained can therefore affect its admissibility or weight.",
  },
];

export default challenges;