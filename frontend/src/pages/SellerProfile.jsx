import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPublicProfile, getPublicListings } from '../api/profileApi';

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

export default function SellerProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getPublicProfile(id), getPublicListings(id)])
      .then(([p, l]) => {
        setProfile(p);
        setListings(l);
      })
      .catch(err => {
        console.error(err);
        setError("Seller not found or failed to load profile.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div style={{ paddingTop: '160px', textAlign: 'center', fontSize: '20px' }}>Loading profile...</div>;
  }

  if (error || !profile) {
    return (
      <div style={{ paddingTop: '160px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>{error}</h1>
        <Link to="/browse" className="pay-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>BACK TO BROWSE</Link>
      </div>
    );
  }

  return (
    <div className="seller-profile-page section" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: '#f9f9f9' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Profile Header */}
        <div className="seller-header" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px', padding: '32px', backgroundColor: '#fff', borderRadius: '8px', border: '2px solid #000', boxShadow: '4px 4px 0px #000' }}>
          <div className="seller-avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#eee', border: '2px solid #000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.first_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '40px', fontWeight: 'bold', color: '#666' }}>{profile.first_name?.[0]}</span>
            )}
          </div>
          <div className="seller-info">
            <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
              {profile.first_name} {profile.last_name}
            </h1>
            <p style={{ margin: '0', color: '#666', fontSize: '16px' }}>
              Joined {new Date(profile.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="seller-listings">
          <h2 style={{ fontSize: '24px', marginBottom: '24px', textTransform: 'uppercase' }}>Items for Sale ({listings.length})</h2>
          
          {listings.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', backgroundColor: '#fff', border: '2px dashed #ccc' }}>
              <p style={{ fontSize: '18px', color: '#666' }}>This seller has no items listed.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {listings.map(listing => (
                <Link 
                  key={listing.id} 
                  to={listing.in_stock ? `/product/${listing.slug}` : '#'}
                  style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    opacity: listing.in_stock ? 1 : 0.6,
                    pointerEvents: listing.in_stock ? 'auto' : 'none'
                  }}
                >
                  <div style={{ backgroundColor: '#fff', border: '2px solid #000', borderRadius: '8px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '220px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '2px solid #000', position: 'relative' }}>
                      <span style={{ color: '#aaa', fontWeight: 'bold' }}>IMG</span>
                      {!listing.in_stock && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-15deg)', backgroundColor: 'var(--brutal-primary)', color: '#fff', padding: '8px 24px', fontSize: '24px', fontWeight: '900', border: '2px solid #000', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          SOLD
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#666', marginBottom: '4px' }}>
                        {listing.brand}
                      </div>
                      <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', lineHeight: '1.2' }}>{listing.name}</h3>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: '20px', fontWeight: '900' }}>{fmt(listing.current_price)}</span>
                        <span style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#f0f0f0', borderRadius: '4px', border: '1px solid #ccc' }}>{listing.condition}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
