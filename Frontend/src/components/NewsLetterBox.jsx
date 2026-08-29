function NewsLetterBox() {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-gray-800 font-medium text-xl">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400">
        Lorem ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="enter your email"
          className="w-full sm:flex-1 outline-none "
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-10 py-4 text-sm uppercase"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default NewsLetterBox;
