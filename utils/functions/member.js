const models = require('../../database/models/index.js');
const Member = models.Member;

module.exports = (client) => {
  client.getMember = async (memberName) => {
    const member = await Member.findOne({ where: { name: memberName } });
    return member;
  };

  client.addMember = async (
    teamName,
    memberId,
    memberName,
    isLeader = false
  ) => {
    const team = await client.getTeam(teamName);
    try {
      await Member.create({
        memberId: memberId,
        name: memberName,
        isLeader: isLeader ? 1 : 0,
        teams_id: team.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Inutile pour le moment
  /* client.removeMembers = async (team) => { 
    const members = await Member.findAll({ where: { teams_id: team.id } });
    members.forEach(async (member) => {
      await member.destroy();
    });
  }; */
};
