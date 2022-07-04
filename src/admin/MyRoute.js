import Base from "../core/Base";

export const MyRoute = () => {
  const NoShow = () => {
    return <h1>This is My Route </h1>;
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {NoShow()}
    </Base>
  );
};
