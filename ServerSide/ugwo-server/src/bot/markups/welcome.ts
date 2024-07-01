export const welcomeMessageMarkup = async (userName: string) => {
  return {
    message: `Hi @${userName}, kedu! 👋, Welcome to ụgwọ, your go-to app for payment request, invoicing and sending funds, built on base. Here is what I can do:\n\n– Help you generate and send payment invoice 📄💸.\n– Send and request funds 💸 using just telegram usernames or tags instantly.\n\n Shall we start? 👇`,
    keyboard: [
      [
        {
          text: 'Launch app 🚀',
          web_app: { url: `https://dc3v8d3l-3000.eun1.devtunnels.ms/` },
        },
      ],
    ],
  };
};
