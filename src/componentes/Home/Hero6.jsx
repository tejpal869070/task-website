import React from "react";

function Hero6() {
  const data = [
    {
      id: 1,
      question: "How does the earning process work?",
      answer:
        "Users can earn money by completing various tasks available on the platform. These tasks may include surveys, watching videos, testing products, participating in quizzes, etc.",
    },
    {
      id: 2,
      question: "Is it free to join and start earning?",
      answer:
        "Yes, absolutely! Joining our platform and accessing tasks to earn money is completely free.",
    },
    {
      id: 2,
      question: "How do I get paid for completing tasks?",
      answer:
        "Depending on the task, users can earn either cash, gift  cards, or other rewards. Payment methods may vary and caninclude PayPal, bank transfer, cryptocurrency, or gift card redemption.",
    },
    {
      id: 2,
      question: "How often can I withdraw my earnings?",
      answer:
        "Users can earn money by completing various tasks available  on the platform. These tasks may include surveys, watching videos, testing products, participating in quizzes, etc.",
    },
    {
      id: 5,
      question: "Are there any restrictions on who can join?",
      answer:
        "Typically, users must be of a certain age (usually 18 or older) to participate. Additionally, some tasks may have specific demographic or geographic requirements.",
    },
    {
      id: 6,
      question: "Is there a limit to how much I can earn?",
      answer:
        "The earning potential varies depending on the number of tasks available and the user's engagement level. Some users may earn more by completing higher-paying tasks or by referring friends to the platform.",
    },
  ];



  
  return (
    <div>
      <div className="slide8 mt-10 " id="FAQ">
        <div>
          <section className="bg-[#243c5d] text-gray-100 py-10 ">
            <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
              <h2 className="mb-12 text-4xl font-bold leadi text-center sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-[#9d9c9c]">
                {data &&
                  data.map((item, index) => (
                    <details>
                      <summary className="py-2 sm:text-xl cursor-pointer ">
                        {item.question}
                      </summary>
                      <div className="px-4 pb-4 text-[#63e1ff]">
                        <p>{item.answer}</p>
                      </div>
                    </details>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Hero6;
