from config import db

class Flower(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(80),unique=False, nullable=False)
    latitude=db.Column(db.Float, nullable=False)
    longitude=db.Column(db.Float, nullable=False)

    def to_json(self):
        return{
            "id": self.id,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude
        }