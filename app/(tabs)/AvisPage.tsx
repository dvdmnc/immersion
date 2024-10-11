import React, { useState } from 'react';
import { ImageBackground,  StyleSheet, Image} from 'react-native';
import BackButton from "@/components/BackButton";

const styles = StyleSheet.create({
  image: {
    opacity: '0.2',
    width:'100vw',
    height:'100vh'
  },
});

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <span 
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{ 
      cursor: 'pointer', 
      fontSize: '40px', 
      color: filled ? 'gold' : 'gray',
      transition: 'color 0.2s ease-in-out'
    }}
  >
    ★
  </span>
);

const AvisPage = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState(0);
  const [hoverNote, setHoverNote] = useState(0);
  const [commentaire, setCommentaire] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!nom || !prenom || !email || !note || !commentaire) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    console.log({ nom, prenom, email, note, commentaire });
    setSubmitted(true);
    setNom('');
    setPrenom('');
    setEmail('');
    setNote(0);
    setHoverNote(0);
    setCommentaire('');

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleStarClick = (rating) => {
    setNote(rating);
  };

  const handleStarHover = (rating) => {
    setHoverNote(rating);
  };

  const handleStarLeave = () => {
    setHoverNote(0);
  };

  return (
    <>

      <Image source={require("../../assets/images/mondrian.png")} style={styles.image}/>

      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', display: "flex", flexDirection: "column", justifyContent:"center", height:"100vh", opacity:"0.8", backgroundColor:"black", position:"absolute"}}>
        <BackButton />
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: "white", display: "flex", justifyContent: "center" }}>Laissez-nous un avis</h1>
        
        {submitted && (
          <div style={{ backgroundColor: '#d1fae5', borderColor: '#34d399', color: '#065f46', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
            <strong>Merci pour votre avis !</strong>
            <p>Votre commentaire a été soumis avec succès.</p>
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: '#fee2e2', borderColor: '#f87171', color: '#991b1b', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
            <strong>Erreur :</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: "center" }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "10px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= (hoverNote || note)}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
              />
            ))}
          </div>
          <div style={{ width: '100%', display: "flex", justifyContent: "space-between" }}>
            <input
              type="text"
              placeholder="Votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              style={{ width: '44%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              placeholder="Votre prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              style={{ width: '44%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
            
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '-webkit-fill-available', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          
          
          
          <textarea
            placeholder="Votre commentaire"
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            style={{ width: '-webkit-fill-available', height: '100px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />

          <div style={{width:"100%", display:'flex', justifyContent:"flex-end"}}>
            <button 
              type="submit" 
              style={{ 
                width: '150px', 
                padding: '10px', 
                backgroundColor: '#77C000', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              Soumettre l'avis
            </button>
          </div>
        
        
        </form>
      </div>
    </>
  );
};

      
    
    

export default AvisPage;