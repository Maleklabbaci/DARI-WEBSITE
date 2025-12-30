# Logique Backend - Plateforme Dari

[...]

## 4. Dari Ads Manager (Système de Performance)

### Schéma SQL des Statistiques
```sql
-- Référentiel pour l'estimation
CREATE TABLE traffic_baseline (
    wilaya VARCHAR(50),
    property_type VARCHAR(50),
    base_views_day INTEGER,
    multiplier DECIMAL(3,1)
);

-- Stats quotidiennes agrégées
CREATE TABLE boost_stats_daily (
    boost_id UUID,
    day DATE,
    impressions INTEGER,
    clicks INTEGER,
    messages INTEGER,
    phone_reveals INTEGER
);
```

### Formule de Calcul de Portée
`portee = (base_views * multiplier) * nb_jours`
`marge = 20% (min = 0.8, max = 1.2)`

### Logique d'Incrémentation (Real-time)
A chaque événement (Vue, Clic, Message), le backend exécute :
```sql
INSERT INTO boost_stats_daily (boost_id, day, impressions)
VALUES ($1, CURRENT_DATE, 1)
ON CONFLICT (boost_id, day) 
DO UPDATE SET impressions = boost_stats_daily.impressions + 1;
```
