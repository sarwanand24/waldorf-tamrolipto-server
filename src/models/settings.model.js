import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
{
  emailBookings:{
    type:Boolean,
    default:true
  },

  emailReservations:{
    type:Boolean,
    default:true
  },

  emailOrders:{
    type:Boolean,
    default:true
  },

  emailEnquiries:{
    type:Boolean,
    default:true
  },

  pushBookings:{
    type:Boolean,
    default:true
  },

  pushOrders:{
    type:Boolean,
    default:false
  }
},
{
  timestamps:true
}
);

export default mongoose.model(
  "Settings",
  settingsSchema
);