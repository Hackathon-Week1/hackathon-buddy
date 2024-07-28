"use client";
import { useRouter } from "next/navigation";
import { signUpAction } from "@/server/sign-up";
import { useFormState } from "react-dom";

export default function Home() {
  const [state, signUp] = useFormState(signUpAction, null);
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  const handleLogInClick = () => {
    router.push("/sign-in");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to HackMate</h1>
      <p style={styles.description}>
        Hackathons are an invaluable opportunity for upcoming developers and
        engineers to gain experience, but finding teammates can prove to be a
        challenge. There’s so much to think about when selecting team members:
        similar time zones, compatible tech stacks, similar interests, just to
        name a few. So, our goal is to make the process of finding teams easier
        for people.
      </p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleSignUpClick}>Sign-up</button>
        <button style={styles.button} onClick={handleLogInClick}>Log in</button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2em',
    color: '#333',
    maxWidth: '800px',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};