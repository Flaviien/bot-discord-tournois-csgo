const models = require('../../database/models/index.js');
const Member = models.Member;

module.exports = (client) => {
  client.getMember = async (key, value) => {
    //By Name, by Id or by role
    try {
      const member = await Member.findOne({ where: { [key]: value } });
      return member;
    } catch (error) {
      console.error(error);
    }
  };

  /* client.getMember = async (name = null, id = null) => {
    //By Name or by Id
    try {
      if (teamName !== null) {
        const member = await Member.findOne({ where: { name } });
        return member;
      }
      if (teamId !== null) {
        const member = await Member.findOne({ where: { id } });
        return member;
      }
    } catch (error) {
      console.error(error);
    }
  }; */

  client.getMembers = async () => {
    try {
      const members = await Member.findAll();
      return members;
    } catch (error) {
      console.error(error);
    }
  };

  client.addMember = async (teamName, memberId, memberName, isLeader = false) => {
    try {
      const team = await client.getTeam('name', teamName);

      await Member.create({
        id: memberId,
        name: memberName,
        isLeader: isLeader ? 1 : 0,
        teams_id: team.id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  client.removeMember = async (id) => {
    try {
      const member = await Member.findOne({ where: { id } });
      member.destroy();
    } catch (error) {
      console.error(error);
    }
  };

  /* client.removeMembers = async (team) => { 
    const members = await Member.findAll({ where: { teams_id: team.id } });
    members.forEach(async (member) => {
      await member.destroy();
    });
  }; */
};
