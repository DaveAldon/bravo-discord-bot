import {
  CommandInteraction,
  Guild,
  Message,
  MessageActionRow,
  MessageSelectMenu,
  SelectMenuInteraction,
  User,
} from 'discord.js';
import { rolesAdd } from '../functions/roles/rolesAdd';
import { rolesRemove } from '../functions/roles/rolesRemove';
import { SlashCommandBuilder } from '@discordjs/builders';

export const roles = () => {
  return {
    data: new SlashCommandBuilder()
      .setName('roles')
      .setDescription('React to the message to assign skill based roles to yourself.')
      .addStringOption(option =>
        option
          .setName('removal')
          .setDescription('Add a reaction to remove a role')
          .setRequired(false)
          .addChoice('remove', 'true')
      ),
    async execute(interaction: CommandInteraction) {
      //interaction.reply('Begin role management:');
      try {
        const filter = `${interaction.options.data[0].value}`;
        if (filter) {
          await rolesDropDown(interaction, true);
        }
      } catch (error) {
        await rolesDropDown(interaction);
        return;
      }
    },
  };
};

const rolesDropDown = async (interaction: CommandInteraction, remove: Boolean = false) => {
  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId(remove ? 'removeRoles' : 'addRoles')
      .setPlaceholder('Multi-select roles from this list')
      .setMinValues(1)
      .setMaxValues(14)
      .addOptions(discordRoles())
  );

  interaction.deferReply();

  const message = (await interaction.followUp({
    content: remove ? 'Remove Roles' : 'Add Roles',
    components: [row],
  })) as Message;

  let buttonFilter = (_i: any) => true;
  const buttonCollector = message.createMessageComponentCollector({
    filter: buttonFilter,
    time: 60000 * 5,
  });

  buttonCollector.on('collect', async (i: SelectMenuInteraction) => {
    if (i.values) {
      const guild = interaction.guild as Guild;
      const user = interaction.user as User;
      const member = guild.members.cache.get(user.id);
      // add each role from selection
      for (const roleId of i.values) {
        const role = guild.roles.cache.find(r => r.id === roleId);
        if (remove) {
          role && member?.roles.remove(role);
        } else {
          role && member?.roles.add(role);
        }
      }
    }
    interaction.followUp(
      `${remove ? 'Removed' : 'Added'} ${i.values.length} role${i.values.length === 1 ? '' : 's'}!`
    );
  });
};

const discordRoles = () => {
  const description = 'Tech role';
  return [
    {
      label: 'C#',
      description,
      value: '879811934638207037',
    },
    {
      label: 'Java',
      description,
      value: '879812138846273617',
    },
    {
      label: 'Angular',
      description,
      value: '879812164649627748',
    },
    {
      label: 'React',
      description,
      value: '879812198606733403',
    },
    {
      label: 'React-Native',
      description,
      value: '879812222778474537',
    },
    {
      label: 'Python',
      description,
      value: '879812247323566131',
    },
    {
      label: 'SQL',
      description,
      value: '879812265635876964',
    },
    {
      label: 'Scrum',
      description,
      value: '879812282903834684',
    },
    {
      label: 'DevOps',
      description,
      value: '879812301673365564',
    },
    {
      label: 'AWS',
      description,
      value: '879812323102056508',
    },
    {
      label: 'Azure',
      description,
      value: '879812342915956807',
    },
    {
      label: 'GCP',
      description,
      value: '879812371634352230',
    },
    {
      label: 'Go',
      description,
      value: '879812389493694484',
    },
    {
      label: 'Terraform',
      description,
      value: '879812407038464040',
    },
  ];
};
